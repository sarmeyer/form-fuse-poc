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
          Released
          Genre
          Director
          Plot
          Awards
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

  const { Title, Director, Released, Genre, Plot, Awards, Poster } =
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
              <img src={Poster} alt="Movie Poster" className="pt-7" />
            </figure>
            <h1 className="text-4xl font-bold">{Title}</h1>
            <div className="flex flex-col justify-center">
              <h2 className="text-lg">{Director}</h2>
              <p>{Released}</p>
              <p>{Genre}</p>
              <p className="italic">{Awards}</p>
              <div className="divider divider-secondary" />
              <p>{Plot}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
