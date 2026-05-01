/** CJK-aware reading time estimator (~500 chars/min for Chinese). */
export function readingTime(text: string): string {
  const cjk = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  const latin = text
    .replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.ceil(cjk / 500 + latin / 250);
  return `${Math.max(1, minutes)} 分鐘`;
}
