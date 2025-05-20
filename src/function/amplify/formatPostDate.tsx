export const formatPostDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();

  // Check if the date is "today"
  const isToday = date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isToday) {
    // Format as "hh:mm"
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } else {
    // Format as "yyyy/mm/dd"
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
};

export const formatAwsTimestamp = (timestamp?: string): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};