import { node } from "fuse"

type MovieSource = {
  Title: string
  Year: string
  imdbID: string
  Type: string
}

// "Nodes" are the core abstraction of Fuse. Each node represents
// a resource/entity with multiple fields and has to define two things:
// 1. load(): How to fetch from the underlying data source
// 2. fields: What fields should be exposed and added for clients
export const MovieNode = node<MovieSource>({
  name: "Movie",
  load: async searchTerm => getMovieData("tenet"),
  fields: t => ({
    Title: t.exposeString("Title"),
    Year: t.exposeString("Year"),
    imdbID: t.exposeString("imdbID"),
    Type: t.exposeString("Type"),
  }),
})

// async function getWeatherData(ids: string[]): Promise<UserSource[]> {
//   return ids.map((id) => ({
//     id,
//     name: `Peter #${id}`,
//     avatar_url: `https://i.pravatar.cc/300?u=${id}`,
//   }))
// }

async function getMovieData(searchTerm: string): Promise<MovieSource[]> {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=d25c02a3&s=${searchTerm}`
  )
  const data = await response.json()
  console.log(data)
  return data
}
