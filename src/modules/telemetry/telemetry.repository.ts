import { db } from "../../config/db";
import { sensorReadings } from "../../config/db/schema";
import { eq } from "drizzle-orm";
import { SensorReading } from "./telemetry.types";

export class TelemetryRepository {
    async save(reading: { deviceId: string, value: number}): Promise<void> {
        await db.insert(sensorReadings).values({
            deviceId: reading.deviceId,
            value: reading.value,
        })
    }

    async findLastReadingsByDevice(deviceId: string, limit = 10): Promise<SensorReading[]> {
        const results = await db
            .select({
                id: sensorReadings.id,
                deviceId: sensorReadings.deviceId,
                value: sensorReadings.value,
                recordedAt: sensorReadings.recordedAt,
            })
            .from(sensorReadings)
            .where(eq(sensorReadings.deviceId, deviceId))
            .limit(limit)

        return results
    }
}