import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LayoutDashboard, Users, UserCog, CalendarDays, BarChart3, TrendingUp, Search, Star, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { useListProviders, useListBookings } from "@workspace/api-client-react";

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const MOCK_USERS = [
  { id: 1, name: "Alice Smith", email: "alice@example.com", role: "user", bookings: 3, joined: "2024-01-15" },
  { id: 2, name: "Bob Thomas", email: "bob@example.com", role: "user", bookings: 1, joined: "2024-02-20" },
  { id: 3, name: "Charlie Dev", email: "charlie@example.com", role: "user", bookings: 2, joined: "2024-03-10" },
  { id: 4, name: "Diana Rao", email: "diana@example.com", role: "provider", bookings: 0, joined: "2024-01-05" },
  { id: 5, name: "Admin User", email: "admin@servicehub.com", role: "admin", bookings: 0, joined: "2024-01-01" },
];

const WEEKLY = [
  { date: "Mon", bookings: 24, revenue: 7200 },
  { date: "Tue", bookings: 35, revenue: 10500 },
  { date: "Wed", bookings: 28, revenue: 8400 },
  { date: "Thu", bookings: 42, revenue: 12600 },
  { date: "Fri", bookings: 56, revenue: 16800 },
  { date: "Sat", bookings: 70, revenue: 21000 },
  { date: "Sun", bookings: 65, revenue: 19500 },
];

const CATEGORY_DATA = [
  { name: "Electrician", value: 28, color: "#f59e0b" },
  { name: "Plumber", value: 22, color: "#3b82f6" },
  { name: "Carpenter", value: 15, color: "#10b981" },
  { name: "AC Repair", value: 12, color: "#8b5cf6" },
  { name: "Others", value: 23, color: "#64748b" },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userSearch, setUserSearch] = useState("");
  const [providerSearch, setProviderSearch] = useState("");

  const { data: providers, isLoading: loadingProviders } = useListProviders();
  const { data: bookings, isLoading: loadingBookings } = useListBookings();

  const filteredUsers = MOCK_USERS.filter(
    (u) => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
  );
  const filteredProviders = (providers ?? []).filter(
    (p) => p.name.toLowerCase().includes(providerSearch.toLowerCase())
  );

  const totalRevenue = (bookings ?? []).reduce((sum, b) => sum + (b.amount || 0), 0);
  const completedCount = (bookings ?? []).filter((b) => b.status === "completed").length;
  const pendingCount = (bookings ?? []).filter((b) => b.status === "pending").length;

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4 mr-3" /> },
    { id: "users", label: "Users", icon: <Users className="w-4 h-4 mr-3" /> },
    { id: "providers", label: "Providers", icon: <UserCog className="w-4 h-4 mr-3" /> },
    { id: "bookings", label: "Bookings", icon: <CalendarDays className="w-4 h-4 mr-3" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4 mr-3" /> },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50">
      <Navbar />
      <div className="flex flex-grow container mx-auto max-w-7xl px-4 py-8 gap-6">

        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 sticky top-24">
            <p className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-3 px-3">Admin Panel</p>
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
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-grow min-w-0">

          {/* ── DASHBOARD ── */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Users", value: MOCK_USERS.length, icon: <Users className="w-5 h-5" />, color: "bg-blue-50 text-blue-500" },
                  { label: "Providers", value: providers?.length ?? "—", icon: <UserCog className="w-5 h-5" />, color: "bg-indigo-50 text-indigo-500" },
                  { label: "Total Bookings", value: bookings?.length ?? "—", icon: <CalendarDays className="w-5 h-5" />, color: "bg-emerald-50 text-emerald-500" },
                  { label: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: <TrendingUp className="w-5 h-5" />, color: "bg-amber-50 text-amber-500" },
                ].map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="p-5 flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                      </div>
                      <div className={`p-2 rounded-lg ${stat.color}`}>{stat.icon}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Weekly Bookings</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={WEEKLY}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                          <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0/0.1)" }} />
                          <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Recent Bookings</h3>
                    {loadingBookings ? (
                      <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-12" />)}</div>
                    ) : (
                      <div className="space-y-3">
                        {(bookings ?? []).slice(0, 5).map((b) => (
                          <div key={b.id} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-lg">
                            <div>
                              <p className="font-medium text-slate-900 text-sm">{b.userName ?? `User #${b.userId}`}</p>
                              <p className="text-xs text-slate-500 capitalize">{b.serviceType}</p>
                            </div>
                            <Badge variant="outline" className={`text-xs capitalize ${STATUS_COLORS[b.status] ?? ""}`}>{b.status}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* ── USERS ── */}
          {activeTab === "users" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Users ({filteredUsers.length})</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input className="pl-9 bg-white w-56" placeholder="Search users…" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
                </div>
              </div>
              <Card>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Bookings</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell className="font-medium">{u.name}</TableCell>
                          <TableCell className="text-slate-500">{u.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              u.role === "admin" ? "bg-purple-50 text-purple-700 border-purple-200" :
                              u.role === "provider" ? "bg-blue-50 text-blue-700 border-blue-200" :
                              "bg-slate-50 text-slate-600 border-slate-200"
                            }>{u.role}</Badge>
                          </TableCell>
                          <TableCell>{u.bookings}</TableCell>
                          <TableCell className="text-slate-500">{new Date(u.joined).toLocaleDateString("en-IN")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          )}

          {/* ── PROVIDERS ── */}
          {activeTab === "providers" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Providers ({filteredProviders.length})</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input className="pl-9 bg-white w-56" placeholder="Search providers…" value={providerSearch} onChange={(e) => setProviderSearch(e.target.value)} />
                </div>
              </div>
              {loadingProviders ? (
                <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-16" />)}</div>
              ) : (
                <Card>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Price/hr</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProviders.map((p) => (
                          <TableRow key={p.id}>
                            <TableCell className="font-medium flex items-center gap-1">
                              {p.name}
                              {p.verified && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                            </TableCell>
                            <TableCell className="capitalize text-slate-500">{p.serviceType.replace(/_/g, " ")}</TableCell>
                            <TableCell className="text-slate-500">{p.city}</TableCell>
                            <TableCell>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                {p.rating.toFixed(1)}
                              </span>
                            </TableCell>
                            <TableCell className="font-medium">₹{p.pricePerHour}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={p.available ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-50 text-slate-500 border-slate-200"}>
                                {p.available ? "Available" : "Busy"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* ── BOOKINGS ── */}
          {activeTab === "bookings" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-900">All Bookings ({bookings?.length ?? 0})</h1>
                <div className="flex gap-2 text-sm">
                  <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 font-medium">{pendingCount} pending</span>
                  <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 font-medium">{completedCount} completed</span>
                </div>
              </div>
              {loadingBookings ? (
                <div className="space-y-3">{[1,2,3,4].map(i => <Skeleton key={i} className="h-16" />)}</div>
              ) : (
                <Card>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>#</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Provider</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(bookings ?? []).map((b) => (
                          <TableRow key={b.id}>
                            <TableCell className="text-slate-400 text-xs">#{b.id}</TableCell>
                            <TableCell className="font-medium">{b.userName ?? `User #${b.userId}`}</TableCell>
                            <TableCell className="text-slate-500">{b.providerName ?? `Provider #${b.providerId}`}</TableCell>
                            <TableCell className="capitalize text-slate-500">{b.serviceType}</TableCell>
                            <TableCell className="text-slate-500 text-sm">{b.date}</TableCell>
                            <TableCell className="font-semibold">₹{b.amount}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`capitalize text-xs ${STATUS_COLORS[b.status] ?? ""}`}>{b.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* ── ANALYTICS ── */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue over week */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Revenue This Week (₹)</h3>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={WEEKLY}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                          <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0/0.1)" }} formatter={(v: number) => [`₹${v}`, "Revenue"]} />
                          <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Category breakdown */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Bookings by Category</h3>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                            {CATEGORY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                          </Pie>
                          <Tooltip contentStyle={{ borderRadius: "8px", border: "none" }} formatter={(v: number) => [`${v}%`, "Share"]} />
                          <Legend iconType="circle" iconSize={8} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Provider ratings */}
                {!loadingProviders && (
                  <Card className="lg:col-span-2">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Top Rated Providers</h3>
                      <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={(providers ?? []).sort((a, b) => b.rating - a.rating).slice(0, 8).map(p => ({ name: p.name.split(" ")[0], rating: p.rating }))}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                            <YAxis domain={[3.5, 5]} axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                            <Tooltip contentStyle={{ borderRadius: "8px", border: "none" }} formatter={(v: number) => [v.toFixed(1), "Rating"]} />
                            <Bar dataKey="rating" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
