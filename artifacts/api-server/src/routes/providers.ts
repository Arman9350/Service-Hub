import { Router, type IRouter } from "express";
import { eq, and, gte, lte } from "drizzle-orm";
import { db, providersTable, usersTable, reviewsTable } from "@workspace/db";
import {
  ListProvidersQueryParams,
  GetProviderParams,
  UpdateProviderAvailabilityParams,
  UpdateProviderAvailabilityBody,
  GetProviderResponse,
  ListProvidersResponse,
  UpdateProviderAvailabilityResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/providers", async (req, res): Promise<void> => {
  const query = ListProvidersQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  let dbQuery = db.select().from(providersTable).$dynamic();

  const filters = [];
  if (query.data.category) {
    filters.push(eq(providersTable.serviceType, query.data.category as any));
  }
  if (query.data.available !== undefined) {
    filters.push(eq(providersTable.available, query.data.available));
  }
  if (query.data.minRating !== undefined) {
    filters.push(gte(providersTable.rating, query.data.minRating));
  }
  if (query.data.maxPrice !== undefined) {
    filters.push(lte(providersTable.pricePerHour, query.data.maxPrice));
  }

  if (filters.length > 0) {
    dbQuery = dbQuery.where(and(...filters));
  }

  const providers = await dbQuery;
  res.json(ListProvidersResponse.parse(providers));
});

router.get("/providers/:id", async (req, res): Promise<void> => {
  const params = GetProviderParams.safeParse({ id: parseInt(req.params.id as string, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [provider] = await db.select().from(providersTable).where(eq(providersTable.id, params.data.id));
  if (!provider) {
    res.status(404).json({ error: "Provider not found" });
    return;
  }

  res.json(GetProviderResponse.parse(provider));
});

router.patch("/providers/:id/availability", async (req, res): Promise<void> => {
  const params = UpdateProviderAvailabilityParams.safeParse({ id: parseInt(req.params.id as string, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = UpdateProviderAvailabilityBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [provider] = await db
    .update(providersTable)
    .set({ available: body.data.available })
    .where(eq(providersTable.id, params.data.id))
    .returning();

  if (!provider) {
    res.status(404).json({ error: "Provider not found" });
    return;
  }

  res.json(UpdateProviderAvailabilityResponse.parse(provider));
});

export default router;
