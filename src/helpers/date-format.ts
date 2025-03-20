export const formatDate = (date: string) => {
  // if date less than 1 miniute then return just now
  // if date less than 1 hour then return minutes ago
  // if date less than 1 day then return hours ago
  // if date less than 1 month then return days ago
  // if date less than 1 year then return months ago
  // if date less than 1 year then return years ago
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const months = Math.floor(diff / 1000 / 60 / 60 / 24 / 30);
  const years = Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 12);
  if (minutes < 1) {
    return "just now";
  } else if (hours < 1) {
    return `${minutes} minutes ago`;
  } else if (days < 1) {
    return `${hours} hours ago`;
  } else if (months < 1) {
    return `${days} days ago`;
  } else if (years < 1) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
};
