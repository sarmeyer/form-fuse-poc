"use client"

import { MovieCard, MovieFields } from "@/components/MovieCard"
import { graphql } from "@/fuse"
import { execute } from "@/fuse/server"

export const MovieQuery = graphql(
  `
    query Movies {
      movies {
        nodes {
          ...MovieCard_MovieFields
        }
      }
    }
  `,
  [MovieFields]
)

export default async function Home() {
  const result = await execute({
    query: MovieQuery,
    variables: {},
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold pb-10">MovieForm</h1>
      <input
        type="text"
        placeholder="Search for a movie"
        className="w-96 p-3 rounded-lg mb-10"
      />
      <p className="text-md mb-6">Some of my faves...</p>
      <div className="grid grid-cols-3 gap-4">
        {result.data?.movies.nodes.map(movie => {
          return <MovieCard movie={movie} />
        })}
      </div>
    </main>
  )
}
