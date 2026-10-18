// Keep each equality readable in a narrow teaching column without splitting
// inside a fraction, a function argument or a decimal comma.
export function teachingMath(math: string): string {
  const rows = math.split(/(?:,|;)?\s*\\(?:qquad|quad)\s*|,\s*\\ /g).flatMap(part => {
    if (part.length <= 76) return [part];
    let braces = 0, parentheses = 0, squares = 0, start = 0;
    const pieces: string[] = [];
    for (let i = 0; i < part.length; i++) {
      const c = part[i];
      if (c === "{") braces++;
      if (c === "}") braces--;
      if (c === "(") parentheses++;
      if (c === ")") parentheses--;
      if (c === "[") squares++;
      if (c === "]") squares--;
      if (i > start && !braces && !parentheses && !squares && (c === "=" || part.startsWith("\\approx", i))) {
        pieces.push(part.slice(start, i));
        start = i;
      }
    }
    pieces.push(part.slice(start));
    return pieces;
  });
  return rows.length > 1 ? `\\begin{gathered}${rows.join("\\\\")}\\end{gathered}` : math;
}
