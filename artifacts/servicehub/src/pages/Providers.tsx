import { useState, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { useListProviders, getListProvidersQueryKey } from "@workspace/api-client-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Star, MapPin, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "electrician", label: "Electrician" },
  { value: "plumber", label: "Plumber" },
  { value: "carpenter", label: "Carpenter" },
  { value: "ac_repair", label: "AC Repair" },
  { value: "tutor", label: "Tutor" },
  { value: "mechanic", label: "Mechanic" },
  { value: "beautician", label: "Beautician" },
  { value: "delivery", label: "Delivery" },
  { value: "freelancer", label: "Freelancer" },
];

export default function Providers() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);

  const [category, setCategory] = useState<string>(params.get("category") ?? "all");
  const [search, setSearch] = useState<string>(params.get("search") ?? "");
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const p = new URLSearchParams(searchString);
    const cat = p.get("category");
    const q = p.get("search");
    if (cat) setCategory(cat);
    if (q) setSearch(q);
  }, [searchString]);

  const { data: providers, isLoading } = useListProviders(
    { category: category === "all" ? undefined : category },
    { query: { queryKey: getListProvidersQueryKey({ category: category === "all" ? undefined : category }) } }
  );

  const filtered = (providers ?? []).filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.serviceType.toLowerCase().includes(q);
    const matchesRating = p.rating >= minRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-grow bg-slate-50 py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-slate-900">Find a Professional</h1>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  className="pl-9 w-full sm:w-56 bg-white"
                  placeholder="Search providers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Category */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-[180px] bg-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Min Rating */}
              <Select value={String(minRating)} onValueChange={(v) => setMinRating(Number(v))}>
                <SelectTrigger className="w-full sm:w-[160px] bg-white">
                  <SelectValue placeholder="Min Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any Rating</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
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
              {filtered.map((provider) => (
                <Link key={provider.id} href={`/providers/${provider.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 overflow-hidden group h-full">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">{provider.name}</h3>
                          <p className="text-slate-500 capitalize">{provider.serviceType.replace(/_/g, ' ')}</p>
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
                          <span className="font-semibold text-slate-900">₹{provider.pricePerHour}/hr</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {filtered.length === 0 && (
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
