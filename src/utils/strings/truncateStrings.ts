export default function truncateString(text?: string | null, num = 50) {
  if (!text) return null;
  if (text.length <= num) {
    return text;
  }
  return text.slice(0, num) + "...";
}
