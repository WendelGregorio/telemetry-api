import { Router } from "express";
import { TelemetryFactory } from "../../factories/telemetry.factory";

const router = Router();
const controller = TelemetryFactory.create();

router.post("/telemetry", (req, res) => controller.ingest(req, res));
router.get("/telemetry/:deviceId", (req, res) => controller.getLastReadings(req, res));

export default router