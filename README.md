<div align="center">
  <a href="https://shade.dragi.me">
    <img height="256" alt="pite" src="https://pite.lukacsjpapp.com/android-chrome-192x192.png">
  </a>
</div>

# Pite

A Recipe Hub for Food Enthusiasts

## Introduction

Pite is a recipe web app enabling users to discover, appreciate, and engage with a diverse range of recipes through viewing, liking, and seamless signup.


## Installing Locally

You can install this project by creating a `.env.local` file in the root directory and adding the following variables:

```
NEXT_PUBLIC_BASE_URL=
RECEPIES_API_RANDOM=https://www.themealdb.com/api/json/v2/1/random.php
RECEPIES_API_NAME=https://www.themealdb.com/api/json/v2/1/search.php?s=
RECEPIES_API_FIRST_LETTER=https://www.themealdb.com/api/json/v2/1/search.php?f=
RECEPIES_API_NAME_ID=https://www.themealdb.com/api/json/v2/1/lookup.php?i=
RECEPIES_API_10=https://www.themealdb.com/api/json/v2/1/randomselection.php
RECEPIES_API_CATEGORIES_WITH_IMG=https://www.themealdb.com/api/json/v2/1/categories.php
RECEPIES_API_CATEGORIES_LIST=https://www.themealdb.com/api/json/v2/1/list.php?c=list
RECEPIES_API_AREA_LIST=https://www.themealdb.com/api/json/v2/1/list.php?a=list
RECEPIES_API_INGRIDIENTS_LIST=https://www.themealdb.com/api/json/v2/1/list.php?i=list
RECEPIES_API_FILTER_INGRIDIENTS=https://www.themealdb.com/api/json/v2/1/filter.php?i=
RECEPIES_API_FILTER_CATEGORY=https://www.themealdb.com/api/json/v2/1/filter.php?c=
RECEPIES_API_FILTER_AREA=https://www.themealdb.com/api/json/v2/1/filter.php?a=
RECEPIES_API_LATEST=https://www.themealdb.com/api/json/v2/1/latest.php
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GITHUB_ID=
GITHUB_SECRET=
RECEPIES_API_KEY=

```


## Built With

- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Database**: [Supabase](https://supabase.io/)
- **Authentication**: [Supabase Auth](https://supabase.io/docs/guides/auth)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Next UI](https://nextui.org/), [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustanddemo.pmnd.rs/), [useContext](https://react.dev/reference/react/useContext)

Deployed on [Vercel](https://vercel.com/)


## Authors



* **Lukacs J Papp** - [lukacspapp](
  https://github.com/lukacspapp)

## License

This project is licensed under the MIT License - see the [MIT license](https://github.com/lukacspapp/recepies/blob/main/LICENSE)
