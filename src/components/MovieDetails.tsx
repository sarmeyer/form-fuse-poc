"use client"

import { useRouter } from "next/navigation"
import { MovieFields } from "@/components/MovieCard"
import { graphql } from "@/fuse"
import { useQuery } from "@/fuse/client"

export const MovieDetailsQuery = graphql(
  `
    query MovieDetails($id: ID!) {
      node(id: $id) {
        ... on Movie {
          ...MovieCard_MovieFields
          released
          genre
          director
          plot
          awards
        }
      }
    }
  `,
  [MovieFields]
)

export const MovieDetails = ({ id }: { id: string }) => {
  const [result] = useQuery({
    query: MovieDetailsQuery,
    variables: { id: id },
  })

  if (result.data?.node?.__typename !== "Movie") return null

  const { title, director, released, genre, plot, awards, poster } =
    result.data.node

  const router = useRouter()

  return (
    <>
      <button className="btn btn-secondary m-8" onClick={() => router.back()}>
        Back
      </button>
      <div className="flex justify-center items-center">
        <section className="ml-auto mr-auto card card-normal w-[600px] bg-slate-500">
          <div className="card-body text-center">
            <figure>
              <img src={poster} alt="Movie Poster" className="pt-7" />
            </figure>
            <h1 className="text-4xl font-bold">{title}</h1>
            <div className="flex flex-col justify-center">
              <h2 className="text-lg">{director}</h2>
              <p>{released}</p>
              <p>{genre}</p>
              <p className="italic">{awards}</p>
              <div className="divider divider-secondary" />
              <p>{plot}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
