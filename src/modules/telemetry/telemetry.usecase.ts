import { DevicesRepository } from "../devices/devices.repository";
import { TelemetryRepository } from "./telemetry.repository";
import { SensorReading } from "./telemetry.types";

interface IngestTelemetryInterface {
    deviceId: string;
    value: number;
    tenantId: string
}

export class TelemetryUsecase {
    constructor(
        private devicesRepository: DevicesRepository,
        private telemetryRepository: TelemetryRepository,
        
    ) {}

    async ingest(input: IngestTelemetryInterface): Promise<void> {
        const { deviceId, value, tenantId } = input;

        const device = await this.devicesRepository.findById(deviceId);

        if (!device) throw new Error("Device not found");
        if (device.tenantId !== tenantId) throw new Error("Unauthorized access to device");

        await this.telemetryRepository.save({
            deviceId,
            value,
        })
    }

    async getLastReadings(
        deviceId: string,
        tenantId: string,
    ): Promise<SensorReading[]> {
        const device = await this.devicesRepository.findById(deviceId);

        if (!device) throw new Error("Device not found");
        if (device.tenantId !== tenantId) throw new Error("Unauthorized access to device");

        return this.telemetryRepository.findLastReadingsByDevice(deviceId);
    }
}