export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString();
};

export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const truncate = (text: string, length = 50) => {
  return text.length > length
    ? text.substring(0, length) + "..."
    : text;
};