import { pgTable, uuid, doublePrecision, timestamp } from "drizzle-orm/pg-core";

export const sensorReadings = pgTable("sensor_readings", {
    id: uuid("id").primaryKey().defaultRandom(),
    deviceId: uuid("device_id").notNull(),
    value: doublePrecision("value").notNull(),
    recordedAt: timestamp("recorded_at").notNull().defaultNow(),
});