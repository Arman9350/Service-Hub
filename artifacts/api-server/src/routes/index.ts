import { Router, type IRouter } from "express";
import healthRouter from "./health";
import providersRouter from "./providers";
import bookingsRouter from "./bookings";
import reviewsRouter from "./reviews";
import usersRouter from "./users";
import adminRouter from "./admin";
import earningsRouter from "./earnings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(providersRouter);
router.use(bookingsRouter);
router.use(reviewsRouter);
router.use(usersRouter);
router.use(adminRouter);
router.use(earningsRouter);

export default router;
