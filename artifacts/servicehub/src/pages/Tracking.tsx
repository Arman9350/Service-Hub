import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation2, Clock, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Tracking() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleCall = () => {
    toast({
      title: "Calling Ramesh Electricals",
      description: "+91 98765 43210",
    });
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-8">

        <Card className="mb-6 border-primary/20 bg-primary/5 shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-white p-3 rounded-full animate-pulse">
                <Navigation2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-900">Provider is on the way</h2>
                <p className="text-sm text-slate-600">Arriving in approx. 12 mins (2.0 km away)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 mb-8 relative h-[400px]">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.1,28.5,77.3,28.7&layer=mapnik"
            style={{ width: "100%", height: "100%", border: 0 }}
            title="Tracking Map"
          />
          <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md border border-slate-100 text-sm font-medium flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-primary" /> Live Tracking
          </div>
        </div>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  RE
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Ramesh Electricals</h3>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <Clock className="w-4 h-4 mr-1" /> Booked for 10:00 AM Today
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <Button
                  variant="outline"
                  className="flex-1 md:flex-none bg-white"
                  onClick={() => setLocation("/chat")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" /> Message
                </Button>
                <Button className="flex-1 md:flex-none" onClick={handleCall}>
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
