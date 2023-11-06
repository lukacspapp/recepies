import { doRequest } from "@/lib/DoRequest";

const key = process.env.RECEPIES_API_KEY;

const urls = {
  filter: {
    ingredients: process.env.RECEPIES_API_FILTER_INGRIDIENTS,
    category: process.env.RECEPIES_API_FILTER_CATEGORY,
    area: process.env.RECEPIES_API_FILTER_AREA
  },
  search: {
    name: process.env.RECEPIES_API_SEARCH_NAME,
    firstLetter: process.env.RECEPIES_API_SEARCH_FIRST_LETTER
  },
  getRandom: process.env.RECEPIES_API_RANDOM,
  getRandom10: process.env.RECEPIES_API_10,
  getById: process.env.RECEPIES_API_GET_BY_ID
}

export async function POST(request: Request) {

  const body = await request.json();

  const { url } = JSON.parse(body) as { url: keyof typeof urls};

  if (urls[url]) {

    const res = await doRequest(
      "POST",
      // @ts-ignore
      urls[url],
      undefined,
      key
    )

    return new Response(JSON.stringify(res))
  }
  return new Response(JSON.stringify({ 'ss': 'ss' }))

}