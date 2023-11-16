import { RequestMethod } from "./types"

export async function doRequest(
  method: RequestMethod,
  url: string,
  body?: any,
  apiKey?: string,
) {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-cache",
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