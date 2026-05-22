import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Bell, Wrench, User, LogOut, LayoutDashboard, IndianRupee, CalendarCheck } from "lucide-react";

interface AuthUser {
  name?: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const load = () => {
      const raw = localStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : null);
    };
    load();
    window.addEventListener("storage", load);
    window.addEventListener("auth-change", load);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("auth-change", load);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    setLocation("/");
    setOpen(false);
  };

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "U";

  const links = [
    { href: "/providers", label: "Find Services" },
    { href: "/admin", label: "Admin" },
    { href: "/chat", label: "Chat" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer" data-testid="logo">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Wrench className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">ServiceHub</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <span
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  location === l.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 hover:bg-slate-50 transition-colors">
                  <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">
                    {user.name ?? user.email}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="flex flex-col gap-0.5">
                  <span className="font-semibold">{user.name ?? "User"}</span>
                  <span className="text-xs font-normal text-muted-foreground truncate">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="h-4 w-4 mr-2" /> My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bookings">
                    <CalendarCheck className="h-4 w-4 mr-2" /> My Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/earnings">
                    <IndianRupee className="h-4 w-4 mr-2" /> Earnings
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <LayoutDashboard className="h-4 w-4 mr-2" /> Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <span
                className="block text-sm font-medium py-2 text-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </span>
            </Link>
          ))}
          {user ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <div className="flex items-center gap-2 py-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{user.name ?? "User"}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full text-red-600 border-red-200" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setOpen(false)}>Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="flex-1" onClick={() => setOpen(false)}>Register</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
