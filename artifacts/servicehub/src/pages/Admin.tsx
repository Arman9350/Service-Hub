import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Users, UserCog, CalendarDays, BarChart3, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const mockStats = {
    totalUsers: 1240,
    totalProviders: 385,
    bookingsToday: 42,
    totalRevenue: 15480,
    bookingsByDay: [
      { date: "Mon", count: 24 },
      { date: "Tue", count: 35 },
      { date: "Wed", count: 28 },
      { date: "Thu", count: 42 },
      { date: "Fri", count: 56 },
      { date: "Sat", count: 70 },
      { date: "Sun", count: 65 },
    ]
  };

  const mockBookings = [
    { id: 101, user: "Alice S.", provider: "Ramesh Elect.", service: "Electrical", status: "completed", date: "Today" },
    { id: 102, user: "Bob T.", provider: "City Plumbers", service: "Plumbing", status: "pending", date: "Today" },
    { id: 103, user: "Charlie D.", provider: "FixIt Co.", service: "Carpenter", status: "confirmed", date: "Tomorrow" },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50">
      <Navbar />
      <div className="flex flex-grow container mx-auto max-w-7xl px-4 py-8 gap-6">
        <aside className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sticky top-24">
            <h2 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4 px-3">Admin Panel</h2>
            <nav className="space-y-1">
              {[
                { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5 mr-3" /> },
                { id: "users", label: "Users", icon: <Users className="w-5 h-5 mr-3" /> },
                { id: "providers", label: "Providers", icon: <UserCog className="w-5 h-5 mr-3" /> },
                { id: "bookings", label: "Bookings", icon: <CalendarDays className="w-5 h-5 mr-3" /> },
                { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-5 h-5 mr-3" /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>
        
        <main className="flex-grow">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Total Users</p>
                        <h3 className="text-3xl font-bold text-slate-900">{mockStats.totalUsers}</h3>
                      </div>
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-500"><Users className="w-5 h-5" /></div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Providers</p>
                        <h3 className="text-3xl font-bold text-slate-900">{mockStats.totalProviders}</h3>
                      </div>
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500"><UserCog className="w-5 h-5" /></div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Bookings Today</p>
                        <h3 className="text-3xl font-bold text-slate-900">{mockStats.bookingsToday}</h3>
                      </div>
                      <div className="p-2 bg-emerald-50 rounded-lg text-emerald-500"><CalendarDays className="w-5 h-5" /></div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Revenue</p>
                        <h3 className="text-3xl font-bold text-slate-900">₹{mockStats.totalRevenue}</h3>
                      </div>
                      <div className="p-2 bg-amber-50 rounded-lg text-amber-500"><TrendingUp className="w-5 h-5" /></div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-6">Weekly Bookings</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockStats.bookingsByDay}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                          <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                          <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-6">Recent Bookings</h3>
                    <div className="space-y-4">
                      {mockBookings.map(b => (
                        <div key={b.id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{b.user}</p>
                            <p className="text-xs text-slate-500">{b.service}</p>
                          </div>
                          <Badge variant="outline" className={
                            b.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                            b.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }>
                            {b.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          {activeTab !== "dashboard" && (
            <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-slate-200">
              <p className="text-slate-500">Module "{activeTab}" is under construction.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
