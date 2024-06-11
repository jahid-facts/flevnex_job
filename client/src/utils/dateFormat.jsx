import { format } from "date-fns";

export const localDateTimeFormat = (dateString) => {
  const date = new Date(dateString);
  return format(date, "dd-MM-yyyy hh:mm aa");
};

export const localDateFormat = (dateString) => {
  const date = new Date(dateString);
  return format(date, "dd-MM-yyyy");
};

export const globalDateFormat = (dateString) => {
  if (!dateString) {
    return dateString;
  }
  const date = new Date(dateString);
  return format(date, "yyyy-MM-dd");
};
