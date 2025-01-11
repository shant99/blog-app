import { formatDistance } from "date-fns";

export default function timeAgo(date: string) {
  return formatDistance(new Date(date), new Date()) + " ago";
}
