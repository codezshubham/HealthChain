import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: any;
}

// Single role
export const requireRole = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        message: `Access denied. Only ${role} allowed`,
      });
    }

    next();
  };
};

// Multiple roles (optional advanced usage)
export const requireAnyRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Allowed roles: ${roles.join(", ")}`,
      });
    }

    next();
  };
};


export const isPatientOwner = () => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const { patientId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role === "PATIENT" && req.user.patientId !== patientId) {
      return res.status(403).json({
        message: "Access denied. Not your data",
      });
    }

    next();
  };
};