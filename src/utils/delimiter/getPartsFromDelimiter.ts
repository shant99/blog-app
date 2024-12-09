export default function getPartsFromDelimiter(
  text: string,
  delimiters: string[],
  delimiterRegex: RegExp
) {
  return text
    .split(delimiterRegex)
    .reduce((acc: string[], part) => {
      if (delimiters.includes(part.trim())) {
        acc[acc.length - 1] += `${part}`;
      } else {
        acc.push(part);
      }
      return acc;
    }, [])
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
}
