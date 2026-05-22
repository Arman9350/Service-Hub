import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Wrench, Zap, Hammer, Wind, BookOpen, Car, Scissors, Package, Briefcase } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const categories = [
    { icon: <Zap className="h-6 w-6" />, name: "Electrician" },
    { icon: <Wrench className="h-6 w-6" />, name: "Plumber" },
    { icon: <Hammer className="h-6 w-6" />, name: "Carpenter" },
    { icon: <Wind className="h-6 w-6" />, name: "AC Repair" },
    { icon: <BookOpen className="h-6 w-6" />, name: "Tutor" },
    { icon: <Car className="h-6 w-6" />, name: "Mechanic" },
    { icon: <Scissors className="h-6 w-6" />, name: "Beautician" },
    { icon: <Package className="h-6 w-6" />, name: "Delivery" },
    { icon: <Briefcase className="h-6 w-6" />, name: "Freelancer" },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary/10 pt-20 pb-28 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
              Find reliable local help in <span className="text-primary">60 seconds</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              ServiceHub is the neighborhood notice board gone digital. Warm, trustworthy, and immediate.
            </p>
            
            <div className="bg-white p-2 rounded-2xl shadow-lg max-w-3xl mx-auto flex flex-col md:flex-row gap-2 mt-10">
              <div className="flex items-center flex-1 bg-slate-50 rounded-xl px-4 py-3">
                <MapPin className="h-5 w-5 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Delhi / Mumbai" 
                  className="bg-transparent border-none outline-none w-full text-slate-700"
                  defaultValue="Delhi, India"
                />
              </div>
              <div className="flex items-center flex-[2] bg-slate-50 rounded-xl px-4 py-3">
                <Search className="h-5 w-5 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="What service do you need?" 
                  className="bg-transparent border-none outline-none w-full text-slate-700"
                />
              </div>
              <Button size="lg" className="h-12 px-8 rounded-xl text-base">
                Find Near Me
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">Browse Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((cat, i) => (
                <Link key={i} href="/providers">
                  <div className="flex flex-col items-center p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-primary/5 hover:border-primary/20 transition-all cursor-pointer group">
                    <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <span className="font-medium text-slate-700 group-hover:text-primary transition-colors">{cat.name}</span>
                  </div>
                </Link>
              ))}
              <Link href="/providers">
                <div className="flex flex-col items-center p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-primary/5 hover:border-primary/20 transition-all cursor-pointer group h-full justify-center">
                  <span className="font-medium text-slate-700 group-hover:text-primary transition-colors">View All &rarr;</span>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Value Prop Section */}
        <section className="py-24 px-4 bg-slate-900 text-white">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h2 className="text-3xl font-bold">Why use ServiceHub?</h2>
            <div className="grid md:grid-cols-3 gap-8 pt-10">
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Truly Local</h3>
                <p className="text-slate-400">Find people in your exact neighborhood.</p>
              </div>
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Immediate</h3>
                <p className="text-slate-400">See who is available right now.</p>
              </div>
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Verified</h3>
                <p className="text-slate-400">Real reviews from your neighbors.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
