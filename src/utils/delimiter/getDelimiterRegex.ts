export default function getDelimiterRegex(delimiters: string[]) {
  return new RegExp(
    `(?<=[${delimiters.join("")}])|(?=[${delimiters.join("")}])`,
    "g"
  );
}
