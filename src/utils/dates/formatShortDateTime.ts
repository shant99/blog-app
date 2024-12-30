import { format } from "date-fns";

export default function formatShortDateTime(date: Date) {
  return format(date, "dd MMM yy h:mm:a");
}
