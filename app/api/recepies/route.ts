import { doRequest } from "@/lib/DoRequest";
import { serializeSearchParam } from "@/lib/utils";

const key = process.env.RECEPIES_API_KEY;

const urls = {
  ingredient: process.env.RECEPIES_API_FILTER_INGRIDIENTS || '',
  category: process.env.RECEPIES_API_FILTER_CATEGORY || '',
  cuisine: process.env.RECEPIES_API_FILTER_AREA || '',
  name: process.env.RECEPIES_API_NAME || '',
  firstLetter: process.env.RECEPIES_API_FIRST_LETTER || '',
  id: process.env.RECEPIES_API_NAME_ID || '',
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

      if (!meals) return new Response(JSON.stringify([]))

      const fetches = meals.map((meal: any) => {
        return doRequest('GET', urls.id + meal.idMeal, null, key)
      })

      const results = await Promise.all(fetches)
      const mealList = results.filter((result: any) => result.meals)
      const filteredMealList = mealList.map((meal: any) => meal.meals).filter((meal: any) => meal.length > 0).flat();

      return new Response(JSON.stringify(filteredMealList))
    }

    const fetches = Object.values(urls).map(key => {
      return doRequest('GET', key + search, null, key)
    })

    const results = await Promise.all(fetches)

    if (!results) return new Response(JSON.stringify([]))

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

    const idFetches = uniqueMealList.map((meal: any) => {
      return doRequest('GET', urls.id + meal.idMeal, null, key)
    })

    const idResults = await Promise.all(idFetches)

    const idMealList = idResults.filter((result: any) => result.meals)
    const filteredIdMealList = idMealList.map((meal: any) => meal.meals).filter((meal: any) => meal.length > 0).flat()

    return new Response(JSON.stringify(filteredIdMealList))
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