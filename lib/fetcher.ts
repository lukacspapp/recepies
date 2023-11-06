export async function doRequest(
  method: string,
  url: string,
  apiKey?: string,
  body?: any,
) {
  const options: RequestInit = {
    method: method,
  }

  if (apiKey) options.headers = { "x-api-key": apiKey }
  if (body) options.body = JSON.stringify(body)

  try {
    const res = await fetch(url, options)
    if (!res.ok) return "There was a problem with the request"
    const responseBody = await res.json()
    return responseBody

  } catch (e) {
    return `There was an Error: ${e}`

  }
}