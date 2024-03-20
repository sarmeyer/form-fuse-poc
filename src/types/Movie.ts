import { addQueryFields, node } from "fuse"
// This is the type we expect from the API
interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Released: string
  Genre: string
  Director: string
  Plot: string
  Awards: string
}

// "Nodes" are the core abstraction of Fuse. Each node represents
// a resource/entity with multiple fields and has to define two things:
// 1. load(): How to fetch from the underlying data source
// 2. fields: What fields should be exposed and added for clients
export const MovieNode = node<Movie>({
  name: "Movie",
  key: "imdbID",
  load: async ids => getMovieData(ids),
  fields: t => ({
    title: t.exposeString("Title"),
    year: t.exposeString("Year"),
    imdbID: t.exposeString("imdbID"),
    type: t.exposeString("Type"),
    poster: t.exposeString("Poster"),
    released: t.exposeString("Released"),
    genre: t.exposeString("Genre"),
    director: t.exposeString("Director"),
    plot: t.exposeString("Plot"),
    awards: t.exposeString("Awards"),
  }),
})

async function getMovieData(ids: string[]): Promise<Movie[]> {
  const movies = await Promise.allSettled(
    ids.map(id =>
      fetch(`http://www.omdbapi.com/?apikey=d25c02a3&i=${id}`).then(x =>
        x.json()
      )
    )
  )

  return await Promise.all(
    movies.map(movie =>
      movie.status === "fulfilled" ? movie.value : new Error(movie.reason)
    )
  )
}

addQueryFields(t => ({
  movies: t.list({
    type: MovieNode,
    resolve: async () => {
      const movies = await getMovieData([
        "tt6723592",
        "tt0816692",
        "tt1375666",
        "tt2935510",
        "tt6710474",
        "tt0468569",
      ])
      return { nodes: movies, totalCount: movies.length }
    },
  }),
}))
