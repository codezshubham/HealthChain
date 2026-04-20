export const setAuth = (token: string, user: any) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/auth/login";
};

// Helper: map a user role to its dashboard route
export const getDashboardPathForRole = (role: string) => {
  if (role === "PATIENT") return "/dashboard/patient";
  if (role === "DOCTOR") return "/dashboard/doctor";
  if (role === "GOVERNMENT") return "/dashboard/government";
  return "/dashboard";
};