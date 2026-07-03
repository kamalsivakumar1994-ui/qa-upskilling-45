let sentence: string = "  I am learning Playwright  ";

console.log("Original:", sentence);
console.log("Length:", sentence.length);
console.log("Trimmed:", sentence.trim());
console.log("Uppercase:", sentence.trim().toUpperCase());
console.log("Lowercase:", sentence.trim().toLowerCase());
console.log("Contains Playwright:", sentence.includes("Playwright"));
console.log("Replace:", sentence.trim().replace("Playwright", "TypeScript"));
console.log("Split into words:", sentence.trim().split(" "));