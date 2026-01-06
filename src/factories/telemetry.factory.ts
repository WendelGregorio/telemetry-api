import { DevicesRepository } from "../modules/devices/devices.repository";
import { TelemetryRepository } from "../modules/telemetry/telemetry.repository";
import { TelemetryUsecase } from "../modules/telemetry/telemetry.usecase";
import { TelemetryController } from "../modules/telemetry/telemetry.controller";

export class TelemetryFactory {
    static create() {
        const devicesRepository = new DevicesRepository();
        const telemetryRepository = new TelemetryRepository();
        const telemetryUsecase = new TelemetryUsecase(devicesRepository, telemetryRepository);

        return new TelemetryController(telemetryUsecase);
    }
}