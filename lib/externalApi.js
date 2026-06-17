export async function fetchExternalApi(path, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const fullPath = queryString ? `${path}?${queryString}` : path;

  const res = await fetch(`/api/proxy?path=${encodeURIComponent(fullPath)}`);
  
  if (!res.ok) throw new Error('API error');
  return res.json();
}