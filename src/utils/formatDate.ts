const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  // Convert to UTC+7 (by adding 7 hours)
  date.setHours(date.getHours() + 7);

  // Format the date to the desired format
  const formattedDate = date.toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return formattedDate;
};
export default formatDate;

export const formatDateForInvoice = (isoString: string) => {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0].replace(/-/g, "/");
};
