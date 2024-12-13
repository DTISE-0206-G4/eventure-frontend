function parseAndReformatDateTime(inputDate: string): string {
  // Helper function to pad numbers with leading zeros
  const pad = (num: number, size: number): string =>
    String(num).padStart(size, "0");

  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const timezoneOffset = -date.getTimezoneOffset(); // Timezone offset in minutes
  const hours = Math.floor(Math.abs(timezoneOffset) / 60);
  const minutes = Math.abs(timezoneOffset) % 60;
  const timezone = `${timezoneOffset >= 0 ? "+" : "-"}${pad(hours, 2)}:${pad(
    minutes,
    2
  )}`;

  // Format the date parts
  return `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(
    date.getDate(),
    2
  )}T${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(
    date.getSeconds(),
    2
  )}.${pad(date.getMilliseconds(), 3)}${timezone}`;
}

export default parseAndReformatDateTime;

export const formatDateTimeForInput = (inputDate: string): string => {
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  // Pad function to ensure two digits
  const pad = (num: number): string => String(num).padStart(2, "0");

  // Extract and format date components
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  // Return formatted string
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
