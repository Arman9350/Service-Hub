import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, bookingsTable, providersTable, usersTable } from "@workspace/db";
import {
  ListBookingsQueryParams,
  CreateBookingBody,
  GetBookingParams,
  UpdateBookingStatusParams,
  UpdateBookingStatusBody,
  GetBookingResponse,
  ListBookingsResponse,
  UpdateBookingStatusResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/bookings", async (req, res): Promise<void> => {
  const query = ListBookingsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const filters = [];
  if (query.data.userId !== undefined) {
    filters.push(eq(bookingsTable.userId, query.data.userId));
  }
  if (query.data.providerId !== undefined) {
    filters.push(eq(bookingsTable.providerId, query.data.providerId));
  }
  if (query.data.status) {
    filters.push(eq(bookingsTable.status, query.data.status as any));
  }

  const bookings = await (filters.length > 0
    ? db.select({
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
      .where(and(...filters))
    : db.select({
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
      .leftJoin(providersTable, eq(bookingsTable.providerId, providersTable.id)));

  res.json(ListBookingsResponse.parse(bookings));
});

router.post("/bookings", async (req, res): Promise<void> => {
  const body = CreateBookingBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [booking] = await db.insert(bookingsTable).values(body.data).returning();

  const [provider] = await db.select().from(providersTable).where(eq(providersTable.id, booking.providerId));

  res.status(201).json(GetBookingResponse.parse({ ...booking, providerName: provider?.name ?? null }));
});

router.get("/bookings/:id", async (req, res): Promise<void> => {
  const params = GetBookingParams.safeParse({ id: parseInt(req.params.id as string, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const rows = await db
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
    .where(eq(bookingsTable.id, params.data.id));

  if (rows.length === 0) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }

  res.json(GetBookingResponse.parse(rows[0]));
});

router.patch("/bookings/:id/status", async (req, res): Promise<void> => {
  const params = UpdateBookingStatusParams.safeParse({ id: parseInt(req.params.id as string, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = UpdateBookingStatusBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [booking] = await db
    .update(bookingsTable)
    .set({ status: body.data.status as any })
    .where(eq(bookingsTable.id, params.data.id))
    .returning();

  if (!booking) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }

  const [provider] = await db.select().from(providersTable).where(eq(providersTable.id, booking.providerId));
  res.json(UpdateBookingStatusResponse.parse({ ...booking, providerName: provider?.name ?? null }));
});

export default router;
