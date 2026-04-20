const generatePatientId = (): string => {
  const prefix = "PAT";

  const timestamp = Date.now().toString().slice(-6); // last 6 digits
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random

  return `${prefix}${timestamp}${random}`;
};

export default generatePatientId;