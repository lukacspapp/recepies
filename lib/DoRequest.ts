export async function doRequest(
  method: string,
  url: string,
  body?: any,
  apiKey?: string,
) {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    }
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