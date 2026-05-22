import { Router, type IRouter } from "express";
import { eq, and, gte, sql } from "drizzle-orm";
import { db, bookingsTable, usersTable } from "@workspace/db";
import {
  GetEarningsQueryParams,
  GetEarningsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/earnings", async (req, res): Promise<void> => {
  const query = GetEarningsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const { providerId } = query.data;

  const allBookings = await db
    .select({
      id: bookingsTable.id,
      date: bookingsTable.date,
      serviceType: bookingsTable.serviceType,
      userName: bookingsTable.userName,
      amount: bookingsTable.amount,
      status: bookingsTable.status,
      createdAt: bookingsTable.createdAt,
    })
    .from(bookingsTable)
    .where(and(
      eq(bookingsTable.providerId, providerId),
      eq(bookingsTable.status, "completed"),
    ));

  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const today = allBookings.filter(b => b.date === todayStr).reduce((s, b) => s + b.amount, 0);
  const thisWeek = allBookings.filter(b => new Date(b.date) >= weekAgo).reduce((s, b) => s + b.amount, 0);
  const thisMonth = allBookings.filter(b => new Date(b.date) >= monthAgo).reduce((s, b) => s + b.amount, 0);
  const total = allBookings.reduce((s, b) => s + b.amount, 0);

  const breakdown = allBookings.map(b => ({
    date: b.date,
    service: b.serviceType,
    userName: b.userName,
    amount: b.amount,
    status: b.status,
  }));

  res.json(GetEarningsResponse.parse({ today, thisWeek, thisMonth, total, breakdown }));
});

export default router;
