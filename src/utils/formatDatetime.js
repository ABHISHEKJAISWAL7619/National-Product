export const FormatDatetime = (
  value,
  format = "date,time",
  timezone = "Asia/Kolkata"
) => {
  if (!value) return "";

  const date = new Date(value);

  const options = { timeZone: timezone };

  // Auto timezone based formatting if only locale formatting is needed
  if (["date", "time", "date,time"].includes(format)) {
    const dateStr = date.toLocaleDateString("en-IN", { ...options });
    const timeStr = date.toLocaleTimeString("en-IN", { ...options });
    if (format === "date") return dateStr;
    if (format === "time") return timeStr;
    return `${dateStr} ${timeStr}`;
  }

  // Manual formatting for custom pattern
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return format
    .replace(/dd/i, dd)
    .replace(/mm/i, mm)
    .replace(/yyyy/i, yyyy)
    .replace(/hh/i, hh)
    .replace(/min/i, min)
    .replace(/ss/i, ss);
};
