import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Edit2, Save, X, CalendarCheck, IndianRupee, Bell, Shield } from "lucide-react";

interface StoredUser {
  name?: string;
  email: string;
  role: string;
  phone?: string;
  city?: string;
  providerId?: number;
}

export default function Profile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "" });

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) { setLocation("/login"); return; }
    const u = JSON.parse(raw) as StoredUser;
    setUser(u);
    setForm({ name: u.name ?? "", phone: u.phone ?? "", city: u.city ?? "" });
  }, []);

  const handleSave = () => {
    if (!user) return;
    const updated = { ...user, name: form.name, phone: form.phone, city: form.city };
    localStorage.setItem("user", JSON.stringify(updated));
    window.dispatchEvent(new Event("auth-change"));
    setUser(updated);
    setEditing(false);
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  const handleCancel = () => {
    if (!user) return;
    setForm({ name: user.name ?? "", phone: user.phone ?? "", city: user.city ?? "" });
    setEditing(false);
  };

  if (!user) return null;

  const roleColor =
    user.role === "admin" ? "bg-purple-50 text-purple-700 border-purple-200" :
    user.role === "provider" ? "bg-blue-50 text-blue-700 border-blue-200" :
    "bg-slate-50 text-slate-600 border-slate-200";

  const initials = (user.name ?? user.email)
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-grow bg-slate-50 py-10 px-4">
        <div className="container mx-auto max-w-2xl space-y-6">

          {/* Avatar + role card */}
          <Card className="overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary to-primary/70" />
            <CardContent className="px-6 pb-6">
              <div className="flex items-end gap-4 -mt-10 mb-4">
                <div className="h-20 w-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-primary font-bold text-2xl flex-shrink-0">
                  {initials}
                </div>
                <div className="mb-1">
                  <h1 className="text-xl font-bold text-slate-900">{user.name ?? "User"}</h1>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <Badge variant="outline" className={`ml-auto capitalize ${roleColor}`}>
                  {user.role === "provider" ? <Shield className="w-3 h-3 mr-1" /> : null}
                  {user.role}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Editable info */}
          <Card>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-slate-900">Personal Information</h2>
                {!editing ? (
                  <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                    <Edit2 className="w-4 h-4 mr-1.5" /> Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-1" /> Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-1" /> Save
                    </Button>
                  </div>
                )}
              </div>

              {[
                { icon: <User className="w-4 h-4" />, label: "Full Name", key: "name", type: "text", placeholder: "Your full name" },
                { icon: <Phone className="w-4 h-4" />, label: "Phone", key: "phone", type: "tel", placeholder: "+91 98765 43210" },
                { icon: <MapPin className="w-4 h-4" />, label: "City", key: "city", type: "text", placeholder: "Delhi, Mumbai…" },
              ].map((field) => (
                <div key={field.key} className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                    {field.icon}
                  </div>
                  <div className="flex-grow">
                    <p className="text-xs font-medium text-slate-500 mb-1">{field.label}</p>
                    {editing ? (
                      <Input
                        type={field.type}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="h-9"
                      />
                    ) : (
                      <p className="text-slate-900 text-sm">
                        {form[field.key as keyof typeof form] || <span className="text-slate-400 italic">Not set</span>}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Email (read-only) */}
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-grow">
                  <p className="text-xs font-medium text-slate-500 mb-1">Email</p>
                  <p className="text-slate-700 text-sm">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick links */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg text-slate-900 mb-4">Quick Access</h2>
              <div className="grid grid-cols-2 gap-3">
                {user.role === "provider" ? (
                  <>
                    <Button variant="outline" className="justify-start gap-2 h-12" onClick={() => setLocation("/provider-dashboard")}>
                      <Shield className="w-4 h-4 text-primary" /> Provider Dashboard
                    </Button>
                    <Button variant="outline" className="justify-start gap-2 h-12" onClick={() => setLocation("/chat")}>
                      <Mail className="w-4 h-4 text-primary" /> Messages
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="justify-start gap-2 h-12" onClick={() => setLocation("/bookings")}>
                      <CalendarCheck className="w-4 h-4 text-primary" /> My Bookings
                    </Button>
                    <Button variant="outline" className="justify-start gap-2 h-12" onClick={() => setLocation("/earnings")}>
                      <IndianRupee className="w-4 h-4 text-primary" /> Earnings
                    </Button>
                  </>
                )}
                <Button variant="outline" className="justify-start gap-2 h-12" onClick={() => setLocation("/notifications")}>
                  <Bell className="w-4 h-4 text-primary" /> Notifications
                </Button>
                {user.role === "admin" && (
                  <Button variant="outline" className="justify-start gap-2 h-12" onClick={() => setLocation("/admin")}>
                    <Shield className="w-4 h-4 text-primary" /> Admin Panel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}
