export const API_ROUTES = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
  },

  PATIENT: {
    PROFILE: (patientId: string) => `/api/patient/${patientId}`,
    HISTORY: (patientId: string) =>
      `/api/patient/${patientId}/history`,
  },

  DOCTOR: {
    SEARCH_PATIENT: "/api/doctor/search",
  },

  RECORDS: {
    ADD: "/api/records/add",
  },

  GOVERNMENT: {
    ANALYTICS: "/api/government/analytics",
  },
};