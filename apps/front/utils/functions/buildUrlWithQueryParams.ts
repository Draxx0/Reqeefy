export function buildUrlWithQueryParams(
  baseUrl: string,
  params: Record<string, any>
): string {
  const queryEntries = Object.entries(params).filter(
    ([_, value]) => value != null && value !== 'undefined'
  );
  const queryString = new URLSearchParams(queryEntries).toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
