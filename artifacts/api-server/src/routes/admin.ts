import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, usersTable, providersTable, bookingsTable } from "@workspace/db";
import {
  GetAdminStatsResponse,
  ListAllBookingsResponse,
  ListAllUsersResponse,
  ListAllProvidersResponse,
  VerifyProviderParams,
  VerifyProviderBody,
  VerifyProviderResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/admin/stats", async (req, res): Promise<void> => {
  const [{ totalUsers }] = await db.select({ totalUsers: sql<number>`count(*)::int` }).from(usersTable);
  const [{ totalProviders }] = await db.select({ totalProviders: sql<number>`count(*)::int` }).from(providersTable);
  const [{ totalBookings }] = await db.select({ totalBookings: sql<number>`count(*)::int` }).from(bookingsTable);

  const today = new Date().toISOString().split("T")[0];
  const [{ bookingsToday }] = await db
    .select({ bookingsToday: sql<number>`count(*)::int` })
    .from(bookingsTable)
    .where(sql`DATE(created_at AT TIME ZONE 'UTC') = ${today}::date`);

  const [{ totalRevenue }] = await db
    .select({ totalRevenue: sql<number>`COALESCE(sum(amount), 0)::float` })
    .from(bookingsTable)
    .where(eq(bookingsTable.status, "completed"));

  const last7 = await db
    .select({
      date: sql<string>`DATE(created_at AT TIME ZONE 'UTC')::text`,
      count: sql<number>`count(*)::int`,
    })
    .from(bookingsTable)
    .where(sql`created_at >= NOW() - INTERVAL '7 days'`)
    .groupBy(sql`DATE(created_at AT TIME ZONE 'UTC')`)
    .orderBy(sql`DATE(created_at AT TIME ZONE 'UTC')`);

  res.json(GetAdminStatsResponse.parse({
    totalUsers,
    totalProviders,
    totalBookings,
    bookingsToday,
    totalRevenue,
    bookingsByDay: last7,
  }));
});

router.get("/admin/bookings", async (req, res): Promise<void> => {
  const bookings = await db
    .select({
      id: bookingsTable.id,
      userId: bookingsTable.userId,
      providerId: bookingsTable.providerId,
      serviceType: bookingsTable.serviceType,
      description: bookingsTable.description,
      date: bookingsTable.date,
      timeSlot: bookingsTable.timeSlot,
      status: bookingsTable.status,
      amount: bookingsTable.amount,
      userName: bookingsTable.userName,
      userPhone: bookingsTable.userPhone,
      providerName: providersTable.name,
      createdAt: bookingsTable.createdAt,
    })
    .from(bookingsTable)
    .leftJoin(providersTable, eq(bookingsTable.providerId, providersTable.id))
    .orderBy(bookingsTable.createdAt);

  res.json(ListAllBookingsResponse.parse(bookings));
});

router.get("/admin/users", async (req, res): Promise<void> => {
  const users = await db.select().from(usersTable);
  res.json(ListAllUsersResponse.parse(users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    createdAt: u.createdAt,
  }))));
});

router.get("/admin/providers", async (req, res): Promise<void> => {
  const providers = await db.select().from(providersTable);
  res.json(ListAllProvidersResponse.parse(providers));
});

router.patch("/admin/providers/:id/verify", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = VerifyProviderParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = VerifyProviderBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [provider] = await db
    .update(providersTable)
    .set({ verified: body.data.verified })
    .where(eq(providersTable.id, params.data.id))
    .returning();

  if (!provider) {
    res.status(404).json({ error: "Provider not found" });
    return;
  }

  res.json(VerifyProviderResponse.parse(provider));
});

export default router;
