export const convertDateFormat = (inputDate: string | number | Date) => {
  const date = new Date(inputDate);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};
