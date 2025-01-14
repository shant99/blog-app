import { addYears } from "date-fns";

export default function getAgeRange(ageRange: string): Date[] {
  const [minAge, maxAge] = ageRange.split(",");
  const currentDate = new Date();
  const minDob = addYears(currentDate, -maxAge - 1);
  const maxDob = addYears(currentDate, -minAge);

  return [minDob, maxDob];
}
