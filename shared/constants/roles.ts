export const ROLES = {
  PATIENT: "PATIENT",
  DOCTOR: "DOCTOR",
  GOVERNMENT: "GOVERNMENT",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// Optional: role permissions mapping
export const ROLE_PERMISSIONS = {
  PATIENT: ["VIEW_OWN_RECORDS"],
  DOCTOR: ["ADD_RECORD", "VIEW_PATIENT"],
  GOVERNMENT: ["VIEW_ANALYTICS"],
} as const;