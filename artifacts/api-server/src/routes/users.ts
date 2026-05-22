import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable, providersTable, notificationsTable, messagesTable } from "@workspace/db";
import {
  CreateUserBody,
  LoginUserBody,
  LoginUserResponse,
  ListNotificationsQueryParams,
  ListNotificationsResponse,
  ListMessagesQueryParams,
  ListMessagesResponse,
  SendMessageBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/users", async (req, res): Promise<void> => {
  const body = CreateUserBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const existing = await db.select().from(usersTable).where(eq(usersTable.email, body.data.email));
  if (existing.length > 0) {
    res.status(400).json({ error: "Email already registered" });
    return;
  }

  const [user] = await db.insert(usersTable).values({
    name: body.data.name,
    email: body.data.email,
    phone: body.data.phone,
    passwordHash: body.data.password,
    role: body.data.role as any,
  }).returning();

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  });
});

router.post("/users/login", async (req, res): Promise<void> => {
  const body = LoginUserBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, body.data.email));
  if (!user || user.passwordHash !== body.data.password) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  res.json(LoginUserResponse.parse({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
    },
    token: `mock-token-${user.id}`,
  }));
});

router.get("/notifications", async (req, res): Promise<void> => {
  const query = ListNotificationsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const notifications = query.data.userId
    ? await db.select().from(notificationsTable).where(eq(notificationsTable.userId, query.data.userId))
    : await db.select().from(notificationsTable);

  res.json(ListNotificationsResponse.parse(notifications));
});

router.get("/messages", async (req, res): Promise<void> => {
  const query = ListMessagesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  let messages: any[] = [];
  if (query.data.userId && query.data.providerId) {
    messages = await db
      .select({
        id: messagesTable.id,
        senderId: messagesTable.senderId,
        receiverId: messagesTable.receiverId,
        senderName: usersTable.name,
        content: messagesTable.content,
        createdAt: messagesTable.createdAt,
      })
      .from(messagesTable)
      .leftJoin(usersTable, eq(messagesTable.senderId, usersTable.id));
  } else {
    messages = await db
      .select({
        id: messagesTable.id,
        senderId: messagesTable.senderId,
        receiverId: messagesTable.receiverId,
        senderName: usersTable.name,
        content: messagesTable.content,
        createdAt: messagesTable.createdAt,
      })
      .from(messagesTable)
      .leftJoin(usersTable, eq(messagesTable.senderId, usersTable.id));
  }

  res.json(ListMessagesResponse.parse(messages));
});

router.post("/messages", async (req, res): Promise<void> => {
  const body = SendMessageBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [message] = await db.insert(messagesTable).values(body.data).returning();
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, message.senderId));

  res.status(201).json({ ...message, senderName: user?.name ?? null });
});

export default router;
