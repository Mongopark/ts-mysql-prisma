import { Router } from "express";
import { PropertyRouter } from "lib/property/property.router";
const router = Router();

router.use("/property", PropertyRouter);

export { router as PrivateRouter };
