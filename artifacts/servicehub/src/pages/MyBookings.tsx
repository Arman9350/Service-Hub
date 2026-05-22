import { useState } from "react";
import { useListBookings, useUpdateBookingStatus, getListBookingsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, MapPin, Clock, Wrench, XCircle } from "lucide-react";
import { Link } from "wouter";

const statusColor: Record<string, string> = {
  pending:   "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function MyBookings() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: bookings, isLoading } = useListBookings();
  const cancelMutation = useUpdateBookingStatus();
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user") ?? "null"); } catch { return null; }
  })();

  const handleCancel = () => {
    if (confirmId === null) return;
    cancelMutation.mutate(
      { id: confirmId, data: { status: "cancelled" } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListBookingsQueryKey() });
          toast({ title: "Booking cancelled", description: `Booking #${confirmId} has been cancelled.` });
          setConfirmId(null);
        },
        onError: () => {
          toast({ title: "Failed to cancel", description: "Please try again.", variant: "destructive" });
          setConfirmId(null);
        },
      }
    );
  };

  const cancellable = (status: string) => status === "pending" || status === "confirmed";

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-grow bg-slate-50 py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <CalendarCheck className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
          </div>

          {!user ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <CalendarCheck className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg mb-4">Please log in to see your bookings.</p>
              <Link href="/login">
                <span className="text-primary font-medium hover:underline cursor-pointer">Go to Login →</span>
              </Link>
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
            </div>
          ) : !bookings?.length ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <CalendarCheck className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg mb-4">You have no bookings yet.</p>
              <Link href="/providers">
                <span className="text-primary font-medium hover:underline cursor-pointer">Find a Service Provider →</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="bg-white border-slate-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Wrench className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg">
                            Booking #{booking.id}
                          </h3>
                          <p className="text-slate-500 text-sm mt-0.5 line-clamp-2">
                            {booking.description ?? "No description provided"}
                          </p>
                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {booking.scheduledAt
                                ? new Date(booking.scheduledAt).toLocaleString("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })
                                : "Time TBD"}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {booking.address ?? "Address TBD"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3 flex-shrink-0">
                        <Badge
                          variant="outline"
                          className={`capitalize text-sm px-3 py-1 ${statusColor[booking.status] ?? "bg-slate-50 text-slate-600"}`}
                        >
                          {booking.status}
                        </Badge>
                        {booking.totalAmount && (
                          <span className="text-lg font-bold text-slate-900">
                            ₹{booking.totalAmount}
                          </span>
                        )}
                        {cancellable(booking.status) && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 gap-1.5"
                            onClick={() => setConfirmId(booking.id)}
                          >
                            <XCircle className="h-4 w-4" />
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <AlertDialog open={confirmId !== null} onOpenChange={(open) => { if (!open) setConfirmId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking #{confirmId}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel your booking. The service provider will be notified. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleCancel}
              disabled={cancelMutation.isPending}
            >
              {cancelMutation.isPending ? "Cancelling…" : "Yes, Cancel"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
