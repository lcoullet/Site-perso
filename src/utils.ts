/**
 * Estimates reading time for a given text.
 * Assumes average reading speed of 200 words per minute.
 */
export function getReadingTime(text: string | undefined): number {
  if (!text) return 0;
  const wordsPerMinute = 200;
  
  // Strip Markdown syntax and HTML tags to get pure word count
  const cleanText = text
    .replace(/<\/?[^>]+(>|$)/g, "") // strip HTML tags
    .replace(/[#*`_\[\]()\-+]/g, " "); // strip markdown characters
  
  const words = cleanText.trim().split(/\s+/);
  const wordCount = words.filter((w) => w.length > 0).length;
  
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
