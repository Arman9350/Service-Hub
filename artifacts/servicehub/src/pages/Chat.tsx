import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Phone, Info } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, senderId: 2, content: "Hi! I saw your booking request for tomorrow at 10AM.", time: "10:30 AM" },
    { id: 2, senderId: 1, content: "Yes! Will you be able to make it?", time: "10:35 AM" },
    { id: 3, senderId: 2, content: "Absolutely. I'll bring all the necessary tools.", time: "10:36 AM" },
  ]);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages([...messages, { id: Date.now(), senderId: 1, content: text, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setText("");
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <Navbar />
      <div className="flex-grow flex flex-col bg-slate-50 container mx-auto max-w-3xl overflow-hidden py-4 px-2">
        <div className="bg-white rounded-t-2xl shadow-sm border border-slate-200 border-b-0 p-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
              RE
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Ramesh Electricals</h2>
              <p className="text-xs text-green-600 font-medium">Online</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-slate-500 rounded-full"><Phone className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" className="text-slate-500 rounded-full"><Info className="w-5 h-5" /></Button>
          </div>
        </div>
        
        <div ref={scrollRef} className="flex-grow bg-white border-x border-slate-200 overflow-y-auto p-4 space-y-4">
          <div className="text-center my-4">
            <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Today</span>
          </div>
          {messages.map((m) => {
            const isMe = m.senderId === 1;
            return (
              <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl p-3 ${isMe ? 'bg-primary text-white rounded-br-sm' : 'bg-slate-100 text-slate-800 rounded-bl-sm'}`}>
                  <p className="text-sm">{m.content}</p>
                  <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-primary-foreground/70' : 'text-slate-400'}`}>{m.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSend} className="bg-white p-3 border border-slate-200 rounded-b-2xl shadow-sm flex gap-2">
          <Input 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Type a message..." 
            className="flex-grow rounded-full border-slate-200 bg-slate-50 focus-visible:ring-1 focus-visible:ring-primary h-11"
          />
          <Button type="submit" size="icon" className="h-11 w-11 rounded-full shrink-0">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
