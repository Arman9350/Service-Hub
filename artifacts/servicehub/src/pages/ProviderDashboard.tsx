import { useState } from "react";
import { useLocation } from "wouter";
import {
  useListBookings,
  useUpdateBookingStatus,
  useGetProvider,
  useUpdateProviderAvailability,
  useListReviews,
  getListBookingsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  CalendarDays,
  IndianRupee,
  Star,
  User,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

const STATUS_COLOR: Record<string, string> = {
  pending:   "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

function getStoredUser() {
  try { return JSON.parse(localStorage.getItem("user") ?? "null"); } catch { return null; }
}

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const user = getStoredUser();
  const providerId = user?.providerId as number | undefined;

  const { data: provider, isLoading: loadingProvider } = useGetProvider(providerId ?? 0, {
    query: { enabled: !!providerId },
  });
  const { data: bookings, isLoading: loadingBookings } = useListBookings(
    { providerId },
    { query: { enabled: !!providerId } }
  );
  const { data: reviews, isLoading: loadingReviews } = useListReviews(
    { providerId },
    { query: { enabled: !!providerId } }
  );

  const statusMutation = useUpdateBookingStatus();
  const availMutation = useUpdateProviderAvailability();

  const handleBookingAction = (id: number, status: "confirmed" | "cancelled") => {
    statusMutation.mutate(
      { id, data: { status } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListBookingsQueryKey({ providerId }) });
          toast({
            title: status === "confirmed" ? "Booking Accepted" : "Booking Declined",
            description: status === "confirmed" ? "The customer will be notified." : "The booking has been cancelled.",
          });
        },
      }
    );
  };

  const handleAvailability = (val: boolean) => {
    if (!providerId) return;
    availMutation.mutate(
      { id: providerId, data: { available: val } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          toast({ title: val ? "You are now Available" : "You are now Unavailable" });
        },
      }
    );
  };

  if (!user || user.role !== "provider") {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center p-8">
          <User className="h-16 w-16 text-slate-200" />
          <h2 className="text-xl font-semibold text-slate-700">Provider access only</h2>
          <p className="text-slate-500">Please log in as a service provider to view this dashboard.</p>
          <Button onClick={() => setLocation("/login")}>Go to Login</Button>
        </div>
      </div>
    );
  }

  const pending   = (bookings ?? []).filter((b) => b.status === "pending");
  const confirmed = (bookings ?? []).filter((b) => b.status === "confirmed");
  const completed = (bookings ?? []).filter((b) => b.status === "completed");
  const totalEarnings = completed.reduce((sum, b) => sum + (b.amount ?? 0), 0);
  const avgRating = reviews?.length ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1) : "—";

  const tabs = [
    { id: "overview",  label: "Overview",    icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
    { id: "bookings",  label: "Bookings",    icon: <CalendarDays    className="w-4 h-4 mr-2" /> },
    { id: "earnings",  label: "Earnings",    icon: <IndianRupee     className="w-4 h-4 mr-2" /> },
    { id: "reviews",   label: "Reviews",     icon: <Star            className="w-4 h-4 mr-2" /> },
    { id: "profile",   label: "My Profile",  icon: <User            className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50">
      <Navbar />
      <div className="flex flex-grow container mx-auto max-w-7xl px-4 py-8 gap-6">

        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 sticky top-24">
            <p className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-3 px-2">Provider Panel</p>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>

            {/* Availability toggle */}
            <div className="mt-4 pt-4 border-t border-slate-100 px-3">
              <p className="text-xs text-slate-500 mb-2 font-medium">Availability</p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${provider?.available ? "text-green-600" : "text-slate-400"}`}>
                  {provider?.available ? "Online" : "Offline"}
                </span>
                <Switch
                  checked={provider?.available ?? false}
                  onCheckedChange={handleAvailability}
                  disabled={availMutation.isPending || !provider}
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 px-1">
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-2"
                onClick={() => setLocation("/chat")}
              >
                <MessageSquare className="w-4 h-4" /> Messages
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-grow min-w-0 space-y-6">

          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">
                  Welcome back, {provider?.name ?? user.name ?? "Provider"} 👋
                </h1>
                {pending.length > 0 && (
                  <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {pending.length} new request{pending.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Pending Requests", value: pending.length, icon: <Clock className="w-5 h-5" />, color: "bg-yellow-50 text-yellow-600" },
                  { label: "Active Bookings",  value: confirmed.length, icon: <CalendarDays className="w-5 h-5" />, color: "bg-blue-50 text-blue-600" },
                  { label: "Completed Jobs",   value: completed.length, icon: <CheckCircle className="w-5 h-5" />, color: "bg-green-50 text-green-600" },
                  { label: "Total Earnings",   value: `₹${totalEarnings.toLocaleString()}`, icon: <TrendingUp className="w-5 h-5" />, color: "bg-amber-50 text-amber-600" },
                ].map((s) => (
                  <Card key={s.label}>
                    <CardContent className="p-5 flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium text-slate-500 mb-1">{s.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900">{s.value}</h3>
                      </div>
                      <div className={`p-2 rounded-lg ${s.color}`}>{s.icon}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pending booking requests */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold text-lg mb-4 text-slate-900">
                    Pending Requests {pending.length > 0 && <span className="ml-2 text-sm text-primary">({pending.length})</span>}
                  </h2>
                  {loadingBookings ? (
                    <div className="space-y-3">{[1,2].map(i => <Skeleton key={i} className="h-20" />)}</div>
                  ) : pending.length === 0 ? (
                    <div className="text-center py-10 text-slate-400">
                      <CalendarDays className="w-10 h-10 mx-auto mb-2 text-slate-200" />
                      <p>No pending requests right now.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pending.map((b) => (
                        <div key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-yellow-50/60 border border-yellow-100 rounded-xl">
                          <div>
                            <p className="font-semibold text-slate-900">{b.userName ?? `Customer #${b.userId}`}</p>
                            <p className="text-sm text-slate-500 capitalize">{b.serviceType} · {b.date} {b.timeSlot && `· ${b.timeSlot}`}</p>
                            <p className="text-sm text-slate-600 mt-1">{b.description}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleBookingAction(b.id, "cancelled")}
                              disabled={statusMutation.isPending}
                            >
                              <XCircle className="w-4 h-4 mr-1" /> Decline
                            </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleBookingAction(b.id, "confirmed")}
                              disabled={statusMutation.isPending}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" /> Accept
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Active bookings quick view */}
              {confirmed.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-semibold text-lg mb-4 text-slate-900">Confirmed Bookings</h2>
                    <div className="space-y-3">
                      {confirmed.map((b) => (
                        <div key={b.id} className="flex items-center justify-between p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900">{b.userName ?? `Customer #${b.userId}`}</p>
                            <p className="text-sm text-slate-500">{b.date} {b.timeSlot && `· ${b.timeSlot}`}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-slate-900">₹{b.amount}</span>
                            <Button size="sm" variant="outline" onClick={() => setLocation("/chat")}>
                              <MessageSquare className="w-3 h-3 mr-1" /> Chat
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* ── BOOKINGS ── */}
          {activeTab === "bookings" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-slate-900">All Bookings</h1>
              {loadingBookings ? (
                <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-24" />)}</div>
              ) : !bookings?.length ? (
                <Card><CardContent className="p-12 text-center text-slate-400">No bookings yet.</CardContent></Card>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <Card key={b.id} className="bg-white border-slate-200">
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-slate-900">{b.userName ?? `Customer #${b.userId}`}</p>
                              <Badge variant="outline" className={`capitalize text-xs ${STATUS_COLOR[b.status] ?? ""}`}>{b.status}</Badge>
                            </div>
                            <p className="text-sm text-slate-500 capitalize">{b.serviceType} · {b.date} {b.timeSlot && `· ${b.timeSlot}`}</p>
                            <p className="text-sm text-slate-600 mt-1">{b.description}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <span className="text-lg font-bold text-slate-900">₹{b.amount}</span>
                            {b.status === "pending" && (
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="text-red-600 border-red-200" onClick={() => handleBookingAction(b.id, "cancelled")} disabled={statusMutation.isPending}>Decline</Button>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleBookingAction(b.id, "confirmed")} disabled={statusMutation.isPending}>Accept</Button>
                              </div>
                            )}
                            {b.status === "confirmed" && (
                              <Button size="sm" variant="outline" onClick={() => setLocation("/chat")}>
                                <MessageSquare className="w-3 h-3 mr-1" /> Message
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
          )}

          {/* ── EARNINGS ── */}
          {activeTab === "earnings" && (
            <div className="space-y-5">
              <h1 className="text-2xl font-bold text-slate-900">Earnings</h1>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs font-medium text-slate-500 mb-1">Total Earnings</p>
                    <h3 className="text-2xl font-bold text-slate-900">₹{totalEarnings.toLocaleString()}</h3>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs font-medium text-slate-500 mb-1">Completed Jobs</p>
                    <h3 className="text-2xl font-bold text-slate-900">{completed.length}</h3>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-none">
                  <CardContent className="p-5">
                    <p className="text-xs font-medium text-primary-foreground/80 mb-1">Provider Earnings</p>
                    <h3 className="text-2xl font-bold">₹{provider?.earningsTotal?.toLocaleString() ?? "0"}</h3>
                  </CardContent>
                </Card>
              </div>
              {completed.length === 0 ? (
                <Card><CardContent className="p-12 text-center text-slate-400">No completed jobs yet.</CardContent></Card>
              ) : (
                <Card>
                  <div className="p-5 border-b border-slate-100">
                    <h3 className="font-semibold">Completed Bookings</h3>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {completed.map((b) => (
                      <div key={b.id} className="flex items-center justify-between px-5 py-4">
                        <div>
                          <p className="font-medium text-slate-900">{b.userName ?? `Customer #${b.userId}`}</p>
                          <p className="text-sm text-slate-500 capitalize">{b.serviceType} · {b.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">₹{b.amount}</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">paid</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* ── REVIEWS ── */}
          {activeTab === "reviews" && (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-900">Reviews</h1>
                {reviews?.length ? (
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-amber-700">{avgRating}</span>
                    <span className="text-amber-600 text-sm">({reviews.length})</span>
                  </div>
                ) : null}
              </div>
              {loadingReviews ? (
                <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-28" />)}</div>
              ) : !reviews?.length ? (
                <Card><CardContent className="p-12 text-center text-slate-400">
                  <Star className="w-10 h-10 mx-auto mb-2 text-slate-200" />
                  No reviews yet. Complete jobs to start collecting reviews.
                </CardContent></Card>
              ) : (
                <div className="space-y-3">
                  {reviews.map((r) => (
                    <Card key={r.id} className="bg-white border-slate-100">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-slate-900">{r.userName ?? "Customer"}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{new Date(r.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
                          </div>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map((s) => (
                              <Star key={s} className={`w-4 h-4 ${s <= r.stars ? "text-amber-500 fill-amber-500" : "text-slate-200"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">{r.feedback}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── PROFILE ── */}
          {activeTab === "profile" && (
            <div className="space-y-5">
              <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
              {loadingProvider ? (
                <Skeleton className="h-64 w-full rounded-xl" />
              ) : !provider ? (
                <Card><CardContent className="p-12 text-center text-slate-400">Provider profile not found.</CardContent></Card>
              ) : (
                <>
                  <Card>
                    <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start">
                      <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold flex-shrink-0">
                        {provider.name.charAt(0)}
                      </div>
                      <div className="flex-grow space-y-3">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">{provider.name}</h2>
                          <p className="text-slate-500 capitalize">{provider.serviceType.replace(/_/g, " ")} · {provider.city}</p>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="flex items-center gap-1 text-amber-600"><Star className="w-4 h-4 fill-amber-400 text-amber-400" />{provider.rating.toFixed(1)} rating</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-600">{provider.totalReviews} reviews</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-600">₹{provider.pricePerHour}/hr</span>
                          {provider.verified && (
                            <>
                              <span className="text-slate-400">·</span>
                              <span className="text-blue-600 font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Verified</span>
                            </>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{provider.description}</p>
                        {provider.skills?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {provider.skills.map((s, i) => (
                              <span key={i} className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full">{s}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Availability Status</h3>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <p className="font-medium text-slate-900">Currently {provider.available ? "Available" : "Unavailable"}</p>
                          <p className="text-sm text-slate-500">Toggle to update your availability for new bookings</p>
                        </div>
                        <Switch
                          checked={provider.available}
                          onCheckedChange={handleAvailability}
                          disabled={availMutation.isPending}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
