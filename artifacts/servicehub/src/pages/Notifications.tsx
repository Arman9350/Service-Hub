import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, CheckCircle, Clock, Star } from "lucide-react";

export default function Notifications() {
  const notifications = [
    { id: 1, type: "booking_confirmed", message: "Your booking with Ramesh Electricals is confirmed for tomorrow 10:00 AM.", read: false, time: "2 hours ago", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { id: 2, type: "booking_request", message: "New booking request from Alice Smith.", read: true, time: "1 day ago", icon: <Clock className="w-5 h-5 text-blue-500" /> },
    { id: 3, type: "review_received", message: "You received a 5-star review from John D.", read: true, time: "2 days ago", icon: <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-3xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center"><Bell className="mr-2" /> Notifications</h1>
          <button className="text-sm text-primary font-medium hover:underline">Mark all as read</button>
        </div>

        <div className="space-y-4">
          {notifications.map(n => (
            <Card key={n.id} className={`overflow-hidden transition-all ${!n.read ? 'border-l-4 border-l-primary shadow-sm bg-white' : 'bg-slate-50/50 border-slate-200 shadow-none'}`}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`p-2 rounded-full mt-1 ${!n.read ? 'bg-primary/10' : 'bg-white'}`}>
                  {n.icon}
                </div>
                <div className="flex-grow">
                  <p className={`text-sm ${!n.read ? 'font-medium text-slate-900' : 'text-slate-600'}`}>{n.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
