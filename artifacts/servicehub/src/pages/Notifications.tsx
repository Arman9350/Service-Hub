import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, CheckCircle, Clock, Star, XCircle } from "lucide-react";

type Notif = {
  id: number;
  type: string;
  message: string;
  read: boolean;
  time: string;
  icon: React.ReactNode;
};

const INITIAL: Notif[] = [
  { id: 1, type: "booking_confirmed", message: "Your booking with Ramesh Electricals is confirmed for tomorrow 10:00 AM.", read: false, time: "2 hours ago", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
  { id: 2, type: "booking_request", message: "New booking request from Alice Smith for Carpentry services.", read: false, time: "5 hours ago", icon: <Clock className="w-5 h-5 text-blue-500" /> },
  { id: 3, type: "review_received", message: "You received a 5-star review from John D. — \"Excellent work!\"", read: true, time: "1 day ago", icon: <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> },
  { id: 4, type: "booking_cancelled", message: "Booking #105 with Sunil Plumbing has been cancelled.", read: true, time: "2 days ago", icon: <XCircle className="w-5 h-5 text-red-500" /> },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notif[]>(INITIAL);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const dismiss = (id: number) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-3xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-6 h-6" /> Notifications
            {unreadCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </h1>
          {unreadCount > 0 && (
            <button
              className="text-sm text-primary font-medium hover:underline"
              onClick={markAllRead}
            >
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <Bell className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500">No notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <Card
                key={n.id}
                className={`overflow-hidden transition-all ${!n.read ? 'border-l-4 border-l-primary shadow-sm bg-white' : 'bg-slate-50/50 border-slate-200 shadow-none'}`}
              >
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={`p-2 rounded-full mt-1 flex-shrink-0 ${!n.read ? 'bg-primary/10' : 'bg-white'}`}>
                    {n.icon}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className={`text-sm ${!n.read ? 'font-medium text-slate-900' : 'text-slate-600'}`}>{n.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!n.read && (
                      <>
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <button
                          onClick={() => markRead(n.id)}
                          className="text-xs text-slate-400 hover:text-primary transition-colors"
                          title="Mark as read"
                        >
                          ✓
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => dismiss(n.id)}
                      className="text-xs text-slate-300 hover:text-red-400 transition-colors ml-1"
                      title="Dismiss"
                    >
                      ✕
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
