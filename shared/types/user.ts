export type UserRole = "PATIENT" | "DOCTOR" | "GOVERNMENT";

export interface BaseUser {
  _id: string;
  name: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface PatientUser extends BaseUser {
  role: "PATIENT";
  patientId: string;
  age: number;
  gender: string;
  address: string;
}

export interface DoctorUser extends BaseUser {
  role: "DOCTOR";
  walletAddress?: string;
}

export interface GovernmentUser extends BaseUser {
  role: "GOVERNMENT";
}

export type User = PatientUser | DoctorUser | GovernmentUser;