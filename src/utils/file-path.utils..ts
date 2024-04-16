export function formatFilePath(path: string) {
  return `${process.env.API_BASE_URL?.replace("/api/v1", "")}${path}`;
}
