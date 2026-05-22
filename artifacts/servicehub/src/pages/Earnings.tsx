import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Earnings() {
  const summary = { today: 120, thisWeek: 450, thisMonth: 1850, total: 12400 };
  const entries = [
    { id: 1, date: "2023-10-24", service: "AC Repair", userName: "John Doe", amount: 60, status: "completed" },
    { id: 2, date: "2023-10-23", service: "AC Installation", userName: "Alice S.", amount: 120, status: "completed" },
    { id: 3, date: "2023-10-21", service: "Gas Filling", userName: "Mike T.", amount: 80, status: "pending" },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Earnings Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-slate-200">
            <CardContent className="p-6 flex flex-col justify-center">
              <p className="text-sm font-medium text-slate-500 mb-2">Today's Earnings</p>
              <h3 className="text-3xl font-bold text-slate-900">₹{summary.today}</h3>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200">
            <CardContent className="p-6 flex flex-col justify-center">
              <p className="text-sm font-medium text-slate-500 mb-2">This Week</p>
              <h3 className="text-3xl font-bold text-slate-900">₹{summary.thisWeek}</h3>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200">
            <CardContent className="p-6 flex flex-col justify-center">
              <p className="text-sm font-medium text-slate-500 mb-2">This Month</p>
              <h3 className="text-3xl font-bold text-slate-900">₹{summary.thisMonth}</h3>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary to-primary/80 border-none text-white">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <p className="text-sm font-medium text-primary-foreground/80 mb-2">Total Earnings</p>
              <h3 className="text-3xl font-bold">₹{summary.total}</h3>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-white">
            <h3 className="font-semibold text-lg text-slate-900">Recent Transactions</h3>
          </div>
          <div className="bg-white overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-slate-600">{new Date(entry.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium text-slate-900">{entry.userName}</TableCell>
                    <TableCell className="text-slate-600">{entry.service}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={entry.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}>
                        {entry.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-slate-900">₹{entry.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </div>
  );
}
