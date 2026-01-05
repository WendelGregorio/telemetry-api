import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const devices = pgTable("devices", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
})