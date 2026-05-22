import { useParams } from "wouter";
import { useGetProvider, getGetProviderQueryKey, useCreateBooking, useListReviews, getListReviewsQueryKey } from "@workspace/api-client-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin, CheckCircle2, Calendar, Clock, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function ProviderProfile() {
  const { id } = useParams();
  const providerId = parseInt(id || "0", 10);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data: provider, isLoading: isProviderLoading } = useGetProvider(providerId, {
    query: { enabled: !!providerId, queryKey: getGetProviderQueryKey(providerId) }
  });

  const { data: reviews, isLoading: isReviewsLoading } = useListReviews({ providerId }, {
    query: { enabled: !!providerId, queryKey: getListReviewsQueryKey({ providerId }) }
  });

  const createBooking = useCreateBooking();

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createBooking.mutate({
      data: {
        userId: 1, // Mock user id
        providerId,
        serviceType: provider?.serviceType || "",
        description: formData.get("description") as string,
        date: formData.get("date") as string,
        timeSlot: formData.get("timeSlot") as string,
        amount: provider?.pricePerHour || 0,
        userName: formData.get("name") as string,
        userPhone: formData.get("phone") as string,
      }
    }, {
      onSuccess: () => {
        setOpen(false);
        toast({ title: "Booking Confirmed", description: "Your service has been requested successfully." });
      }
    });
  };

  if (isProviderLoading) return <div className="p-8 max-w-4xl mx-auto"><Skeleton className="h-[400px] w-full" /></div>;
  if (!provider) return <div className="p-8 text-center">Provider not found</div>;

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-grow bg-slate-50 py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-slate-200 flex-shrink-0 mx-auto md:mx-0 border-4 border-white shadow-md overflow-hidden">
                {provider.photo ? (
                  <img src={provider.photo} alt={provider.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold">
                    {provider.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-grow text-center md:text-left">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
                      {provider.name}
                      {provider.verified && <CheckCircle2 className="w-6 h-6 text-blue-500" />}
                    </h1>
                    <p className="text-lg text-slate-500 capitalize mt-1">{provider.serviceType.replace('_', ' ')}</p>
                  </div>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="w-full md:w-auto text-lg px-8">Book Now</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Book {provider.name}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleBooking} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Date</label>
                            <Input type="date" name="date" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Time Slot</label>
                            <Select name="timeSlot" required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="9AM">9:00 AM</SelectItem>
                                <SelectItem value="11AM">11:00 AM</SelectItem>
                                <SelectItem value="2PM">2:00 PM</SelectItem>
                                <SelectItem value="4PM">4:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Your Name</label>
                          <Input name="name" required placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone Number</label>
                          <Input name="phone" required placeholder="+1 234 567 8900" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Task Description</label>
                          <Textarea name="description" required placeholder="Describe what you need help with..." />
                        </div>
                        <Button type="submit" className="w-full mt-4" disabled={createBooking.isPending}>
                          {createBooking.isPending ? "Confirming..." : `Confirm Booking • ₹${provider.pricePerHour}/hr`}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6 text-sm text-slate-600">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-amber-500 mr-1 fill-amber-500" />
                    <span className="font-bold text-slate-900 mr-1">{provider.rating.toFixed(1)}</span>
                    <span>({provider.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-1" />
                    {provider.city} {provider.distanceKm && `• ${provider.distanceKm}km away`}
                  </div>
                  <div className="flex items-center font-medium text-slate-900">
                    ₹{provider.pricePerHour} / hour
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  <h3 className="font-semibold text-slate-900 text-lg">About</h3>
                  <p className="text-slate-600 leading-relaxed">{provider.description}</p>
                  
                  {provider.skills && provider.skills.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {provider.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-700">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Reviews</h2>
            {isReviewsLoading ? (
              <div className="space-y-4"><Skeleton className="h-32 w-full" /></div>
            ) : reviews?.length ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="border-slate-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-slate-900">{review.userName || "Customer"}</p>
                          <p className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`w-4 h-4 ${star <= review.stars ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-700 mt-2">{review.feedback}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 bg-white p-8 rounded-xl text-center border border-slate-100">No reviews yet.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
