interface DataFormatHelper {
  date: Date;
}

/**
 * Formata uma data no formato "DD/MM/YYYY HH:mm:ss".
 *
 * @example
 * formatDate(new Date('2023-10-05T14:48:00')) // "05/10/2023 14:48:00"
 */
export function formatDate({ date }: DataFormatHelper): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
