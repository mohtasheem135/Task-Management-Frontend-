export const getDateAndTime = (dateTimeString) => {
  const dateObj = new Date(dateTimeString);

  // Convert date to DD/MM/YYYY format
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = dateObj.getFullYear();
  const date = `${day}/${month}/${year}`;

  // Convert time to IST in am/pm format
  const options = {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };
  const time = dateObj.toLocaleTimeString("en-US", options);

  return { date, time };
};

export function replaceSpacesWithUnderscores(str) {
  if (typeof str !== "string") {
    throw new Error("Input must be a string");
  }

  // Replace spaces with underscores
  return str.replace(/\s+/g, "_");
}
