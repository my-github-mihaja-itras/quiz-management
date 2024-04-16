import { FilterKeywords } from "@/components/shared/filter/filter.constant";

export const ExtractFilterKeywords = (keywords: FilterKeywords[]): String => {
  const newKeywords = keywords.map((keyword) => {
    const { key, type, value } = keyword;
    return `&${key}%3A${type}=${value}`;
  });

  return newKeywords.join("");
};
