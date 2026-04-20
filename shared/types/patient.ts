export interface PatientProfile {
  patientId: string;
  name: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
}

export interface PatientSearchQuery {
  patientId: string;
}