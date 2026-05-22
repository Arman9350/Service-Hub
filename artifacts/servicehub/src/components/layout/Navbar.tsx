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
import {
  Menu, X, Bell, Wrench, User, LogOut, LayoutDashboard,
  IndianRupee, CalendarCheck, Shield, Search, MessageSquare,
} from "lucide-react";

interface AuthUser {
  name?: string;
  email: string;
  role: string;
  providerId?: number;
}

function getUser(): AuthUser | null {
  try { return JSON.parse(localStorage.getItem("user") ?? "null"); } catch { return null; }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState<AuthUser | null>(getUser);

  useEffect(() => {
    const sync = () => setUser(getUser());
    window.addEventListener("storage", sync);
    window.addEventListener("auth-change", sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener("auth-change", sync); };
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

  // Role-based nav links
  const links =
    user?.role === "provider"
      ? [
          { href: "/provider-dashboard", label: "My Dashboard" },
          { href: "/chat", label: "Messages" },
        ]
      : user?.role === "admin"
      ? [
          { href: "/providers", label: "Find Services" },
          { href: "/admin", label: "Admin Panel" },
        ]
      : [
          { href: "/providers", label: "Find Services" },
          { href: "/chat", label: "Chat" },
        ];

  // Role-based dropdown items
  const dropdownItems =
    user?.role === "provider"
      ? [
          { label: "Provider Dashboard", href: "/provider-dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
          { label: "My Earnings",         href: "/earnings",           icon: <IndianRupee      className="h-4 w-4 mr-2" /> },
          { label: "My Profile",          href: "/profile",            icon: <User             className="h-4 w-4 mr-2" /> },
        ]
      : user?.role === "admin"
      ? [
          { label: "Admin Panel", href: "/admin",   icon: <Shield          className="h-4 w-4 mr-2" /> },
          { label: "My Profile",  href: "/profile", icon: <User            className="h-4 w-4 mr-2" /> },
        ]
      : [
          { label: "My Profile",   href: "/profile",   icon: <User          className="h-4 w-4 mr-2" /> },
          { label: "My Bookings",  href: "/bookings",  icon: <CalendarCheck className="h-4 w-4 mr-2" /> },
          { label: "Earnings",     href: "/earnings",  icon: <IndianRupee   className="h-4 w-4 mr-2" /> },
        ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Wrench className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">ServiceHub</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <span className={`text-sm font-medium transition-colors cursor-pointer ${
                location === l.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}>{l.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          {/* Search shortcut for users/admin */}
          {user?.role !== "provider" && (
            <Link href="/providers">
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </Link>
          )}

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
                  <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">{initials}</div>
                  <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">{user.name ?? user.email}</span>
                  {user.role !== "user" && (
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                    }`}>{user.role}</span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="flex flex-col gap-0.5">
                  <span className="font-semibold">{user.name ?? "User"}</span>
                  <span className="text-xs font-normal text-muted-foreground truncate">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dropdownItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>
                      {item.icon} {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login"><Button variant="outline" size="sm">Login</Button></Link>
              <Link href="/register"><Button size="sm">Register</Button></Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <span className="block text-sm font-medium py-2 text-foreground hover:text-primary transition-colors cursor-pointer" onClick={() => setOpen(false)}>{l.label}</span>
            </Link>
          ))}
          <Link href="/notifications">
            <span className="block text-sm font-medium py-2 text-foreground hover:text-primary transition-colors cursor-pointer" onClick={() => setOpen(false)}>Notifications</span>
          </Link>
          {user ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <div className="flex items-center gap-2 py-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">{initials}</div>
                <div>
                  <p className="text-sm font-semibold">{user.name ?? "User"}</p>
                  <p className="text-xs text-muted-foreground">{user.email} · {user.role}</p>
                </div>
              </div>
              {dropdownItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="flex items-center text-sm py-1.5 text-slate-700 hover:text-primary cursor-pointer" onClick={() => setOpen(false)}>
                    {item.icon} {item.label}
                  </span>
                </Link>
              ))}
              <Button variant="outline" size="sm" className="w-full text-red-600 border-red-200 mt-1" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link href="/login"><Button variant="outline" size="sm" className="flex-1" onClick={() => setOpen(false)}>Login</Button></Link>
              <Link href="/register"><Button size="sm" className="flex-1" onClick={() => setOpen(false)}>Register</Button></Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
