import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [isProvider, setIsProvider] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const role = isProvider ? "provider" : "user";
    localStorage.setItem("user", JSON.stringify({ name: formData.name, email: formData.email, role }));
    window.dispatchEvent(new Event("auth-change"));
    toast({ title: "Account created", description: "Welcome to ServiceHub!" });
    setLocation("/");
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <div className="flex items-center gap-2 text-primary font-bold text-2xl cursor-pointer">
              <Zap className="h-6 w-6" />
              <span>ServiceHub</span>
            </div>
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-6">Create an Account</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Phone</label>
            <Input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 234 567 8900" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <Input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••••" />
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50 mt-4">
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-slate-900">I am a Service Provider</label>
              <p className="text-xs text-slate-500">Sign up to offer your services</p>
            </div>
            <Switch checked={isProvider} onCheckedChange={setIsProvider} />
          </div>
          <Button type="submit" className="w-full h-12 text-lg mt-4">Sign Up</Button>
        </form>
        <div className="text-center mt-6 text-slate-600">
          Already have an account? <Link href="/login"><span className="text-primary hover:underline cursor-pointer">Log in</span></Link>
        </div>
      </div>
    </div>
  );
}
