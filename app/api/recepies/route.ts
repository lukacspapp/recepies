import { doRequest } from "@/lib/DoRequest";
import { serializeSearchParam } from "@/lib/stringFormatter";

const key = process.env.RECEPIES_API_KEY;

const urls = {
  ingredient: process.env.RECEPIES_API_FILTER_INGRIDIENTS || '',
  category: process.env.RECEPIES_API_FILTER_CATEGORY || '',
  cuisine: process.env.RECEPIES_API_FILTER_AREA || '',
  name: process.env.RECEPIES_API_NAME || '',
  firstLetter: process.env.RECEPIES_API_FIRST_LETTER || '',
}

export async function GET(request: Request) {

  return new Response('Hello');
}

export async function POST(req: Request) {
  let url: any

  try {
    const { search, type } = await req.json() as { search: string, type: string };

    if (type) {
      url = urls[type.toLowerCase() as keyof typeof urls] + serializeSearchParam(search);
      const { meals } = await doRequest('GET', url, null, key);
      return new Response(JSON.stringify(meals))
    }

    const fetches = Object.values(urls).map(key => {
      return doRequest('GET', key + search, null, key)
    })

    const results = await Promise.all(fetches)
    const mealList = results.filter((result: any) => result.meals)
    const filteredMealList = mealList.map((meal: any) => meal.meals).filter((meal: any) => meal.length > 0).flat()

    const uniqueMealList = filteredMealList.reduce((acc: any, current: any) => {
      const x = acc.find((item: any) => item.idMeal === current.idMeal);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    return new Response(JSON.stringify(uniqueMealList))
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return new Response(JSON.stringify({ error: 'Invalid JSON input' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}