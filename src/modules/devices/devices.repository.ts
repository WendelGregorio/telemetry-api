import { db } from "../../config/db";
import { devices } from "../../config/db/schema";
import { eq } from "drizzle-orm";
import { Device } from "./devices.types";

export const getDeviceById = async (id: string): Promise<Device | null> => {
    const device = await db
        .select({
            id: devices.id,
            name: devices.name,
            tenantId: devices.tenantId,
        })
        .from(devices)
        .where(eq(devices.id, id))
        .limit(1)

    if(device.length === 0) return null;

    return device[0];
}