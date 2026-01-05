import "express";

declare global {
    namespace Express {
        interface User {
            tenantId: string;
        }

        interface Request {
            user?: User;
        }
    }
}