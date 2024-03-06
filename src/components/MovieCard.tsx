import { FragmentOf, graphql, readFragment } from "@/fuse"

export const MovieFields = graphql(`
  fragment MovieCard_MovieFields on Movie {
    Title
    Year
    Poster
  }
`)

export const MovieCard = (props: { movie: FragmentOf<typeof MovieFields> }) => {
  const { Title, Poster, Year } = readFragment(MovieFields, props.movie)

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl mb-11">
      <figure>
        <img src={Poster} alt="Movie Poster" className="pt-7" />
      </figure>
      <div className="card-body">
        <div className="card-actions justify-around">
          <div>
            <h2 className="text-lg">{Title}</h2>
            <p>{Year}</p>
          </div>
          <button className="btn btn-primary">Find out more</button>
        </div>
      </div>
    </div>
  )
}
