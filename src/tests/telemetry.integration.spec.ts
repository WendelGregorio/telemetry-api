import request from 'supertest';
import { app } from '../app';
import { closeDb, db } from '../config/db';
import { devices, sensorReadings } from '../config/db/schema';

import { randomUUID } from "crypto";

const device1Id = randomUUID();
const device2Id = randomUUID();

describe("Telemetry multi-tenant isolation", () => {
    beforeAll(async () => {
        await db.delete(sensorReadings)
        await db.delete(devices)

        await db.insert(devices).values([
            { id: device1Id, tenantId: 'tenantA', name: 'Sensor 1' },
            { id: device2Id, tenantId: 'tenantB', name: 'Sensor 2' },
        ])

        await db.insert(sensorReadings).values([
            { deviceId: device1Id, value: 42 },
            { deviceId: device2Id, value: 84 },
        ])
    })

    it("should not  allow access to telemetry  from another  tenant", async () => {
        const response = await request(app)
            .get(`/telemetry/${device2Id}`)
            .set("x-tenant-id", "tenantA")

        expect(response.status).toBe(403)
        expect(response.body).toEqual({message:"Unauthorized access to device"})
    })

    it('should not allow writing telemetry for a device from another tenant', async () => {
        await request(app)
            .post('/telemetry')
            .set("x-tenant-id", "tenantA")
            .send({ deviceId: device2Id, value: 30 })
            .expect(403)
    })

    afterAll(async () => {
        await closeDb();
    });
})