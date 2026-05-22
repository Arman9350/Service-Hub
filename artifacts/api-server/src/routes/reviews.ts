import { Router, type IRouter } from "express";
import { eq, and, avg } from "drizzle-orm";
import { db, reviewsTable, usersTable, providersTable } from "@workspace/db";
import {
  ListReviewsQueryParams,
  CreateReviewBody,
  ListReviewsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/reviews", async (req, res): Promise<void> => {
  const query = ListReviewsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const filters = [];
  if (query.data.providerId !== undefined) {
    filters.push(eq(reviewsTable.providerId, query.data.providerId));
  }
  if (query.data.userId !== undefined) {
    filters.push(eq(reviewsTable.userId, query.data.userId));
  }

  const reviews = await (filters.length > 0
    ? db.select({
        id: reviewsTable.id,
        bookingId: reviewsTable.bookingId,
        providerId: reviewsTable.providerId,
        userId: reviewsTable.userId,
        userName: usersTable.name,
        stars: reviewsTable.stars,
        feedback: reviewsTable.feedback,
        createdAt: reviewsTable.createdAt,
      })
      .from(reviewsTable)
      .leftJoin(usersTable, eq(reviewsTable.userId, usersTable.id))
      .where(and(...filters))
    : db.select({
        id: reviewsTable.id,
        bookingId: reviewsTable.bookingId,
        providerId: reviewsTable.providerId,
        userId: reviewsTable.userId,
        userName: usersTable.name,
        stars: reviewsTable.stars,
        feedback: reviewsTable.feedback,
        createdAt: reviewsTable.createdAt,
      })
      .from(reviewsTable)
      .leftJoin(usersTable, eq(reviewsTable.userId, usersTable.id)));

  res.json(ListReviewsResponse.parse(reviews));
});

router.post("/reviews", async (req, res): Promise<void> => {
  const body = CreateReviewBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [review] = await db.insert(reviewsTable).values(body.data).returning();

  const allReviews = await db
    .select({ stars: reviewsTable.stars })
    .from(reviewsTable)
    .where(eq(reviewsTable.providerId, review.providerId));

  const avgRating = allReviews.reduce((sum, r) => sum + r.stars, 0) / allReviews.length;

  await db
    .update(providersTable)
    .set({ rating: parseFloat(avgRating.toFixed(1)), totalReviews: allReviews.length })
    .where(eq(providersTable.id, review.providerId));

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, review.userId));

  res.status(201).json({
    ...review,
    userName: user?.name ?? null,
  });
});

export default router;
