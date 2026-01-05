import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.header('x-tenant-id');

    if (!tenantId) return res.status(401).json({ message: 'Unauthorized: Tenant ID is missing' });

    req.user = { tenantId };

    next();
}