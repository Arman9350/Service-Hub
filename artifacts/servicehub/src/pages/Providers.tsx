import { useState } from "react";
import { Link } from "wouter";
import { useListProviders, getListProvidersQueryKey } from "@workspace/api-client-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Providers() {
  const [category, setCategory] = useState<string>("all");
  const [minRating, setMinRating] = useState([3]);

  const { data: providers, isLoading } = useListProviders(
    { category: category === "all" ? undefined : category, minRating: minRating[0] },
    { query: { queryKey: getListProvidersQueryKey({ category: category === "all" ? undefined : category, minRating: minRating[0] }) } }
  );

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-grow bg-slate-50 py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-slate-900">Find a Professional</h1>
            <div className="flex gap-4 w-full md:w-auto">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electrician">Electrician</SelectItem>
                  <SelectItem value="plumber">Plumber</SelectItem>
                  <SelectItem value="carpenter">Carpenter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers?.map((provider) => (
                <Link key={provider.id} href={`/providers/${provider.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 overflow-hidden group h-full">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">{provider.name}</h3>
                          <p className="text-slate-500 capitalize">{provider.serviceType.replace('_', ' ')}</p>
                        </div>
                        {provider.available && <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Available</Badge>}
                      </div>
                      <div className="space-y-2 mt-4">
                        <div className="flex items-center text-sm text-slate-600">
                          <Star className="w-4 h-4 text-amber-500 mr-2 fill-amber-500" />
                          <span className="font-medium mr-1">{provider.rating.toFixed(1)}</span>
                          <span>({provider.totalReviews} reviews)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-slate-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {provider.distanceKm ? `${provider.distanceKm.toFixed(1)} km` : 'Local'}
                          </div>
                          <span className="font-semibold text-slate-900">${provider.pricePerHour}/hr</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {providers?.length === 0 && (
                <div className="col-span-full text-center py-20 text-slate-500">
                  No providers found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
