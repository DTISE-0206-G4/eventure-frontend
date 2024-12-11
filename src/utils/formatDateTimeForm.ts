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
