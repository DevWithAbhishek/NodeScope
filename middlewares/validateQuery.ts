import { type Request, type Response, type NextFunction } from "express";

export default function validateQuery(allowedValues: any, paramsName = 'level') {
    return (req: Request, res: Response, next: NextFunction) => {
        const value = req.query[paramsName];
        if (value === undefined) {
            return next(); // absent query params is fine - route should apply a default
        }

        if (!allowedValues.include(value)) {
            return res.status(400).json({
                error: `Invalid ${paramsName}. Expected one of: ${allowedValues.join(', ')}`
            });
        }
        next();
    }
}
