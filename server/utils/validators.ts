// Validate phone number (India format simple)
export const isValidPhone = (phone: string): boolean => {
  return /^[6-9]\d{9}$/.test(phone);
};

// Validate role
export const isValidRole = (role: string): boolean => {
  return ["PATIENT", "DOCTOR", "GOVERNMENT"].includes(role);
};

// Validate required fields
export const validateRequired = (fields: Record<string, any>) => {
  for (const key in fields) {
    if (!fields[key]) {
      return `${key} is required`;
    }
  }
  return null;
};