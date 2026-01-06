import { Request, Response } from "express";
import { TelemetryUsecase } from "./telemetry.usecase";

export class TelemetryController {
    constructor(private telemetryUseCase: TelemetryUsecase) {}

    async ingest(req: Request, res: Response): Promise<Response> {
        try {
            const { deviceId, value } = req.body;
            const tenantId = req.user!.tenantId;

            if(!deviceId || typeof value !== 'number') return res.status(400).json({ message: "Invalid payload" });

            await this.telemetryUseCase.ingest({ deviceId, value, tenantId });

            return res.status(201).send();
        } catch (error) {
            if(error instanceof Error) {
                if(error.message == "Device not found") {
                    return res.status(404).json({ message: error.message });
                }

                if(error.message == "Unauthorized access to device") {
                    return res.status(403).json({ message: error.message });
                }
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getLastReadings(req: Request, res: Response): Promise<Response> {
        try {
            const { deviceId } = req.params;
            const tenantId = req.user!.tenantId;
            
            if(!deviceId) return res.status(400).json({ message: "Device ID is required" });

            const readings = await this.telemetryUseCase.getLastReadings(deviceId, tenantId);

            return res.status(200).json(readings);

        } catch (error) {
            if(error instanceof Error) {
                if(error.message == "Device not found") {
                    return res.status(404).json({ message: error.message });
                }

                if(error.message == "Unauthorized access to device") {
                    return res.status(403).json({ message: error.message });
                }
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}