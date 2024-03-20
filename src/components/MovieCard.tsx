import { FragmentOf, graphql, readFragment } from "@/fuse"

export const MovieFields = graphql(`
  fragment MovieCard_MovieFields on Movie {
    title
    year
    poster
    id
  }
`)

export const MovieCard = (props: { movie: FragmentOf<typeof MovieFields> }) => {
  const { title, year, poster, id } = readFragment(MovieFields, props.movie)

  return (
    <div
      className="card card-compact w-96 bg-base-100 shadow-xl mb-11"
      key={id}
    >
      {poster && (
        <figure>
          <img src={poster} alt="Movie Poster" className="pt-7" />
        </figure>
      )}
      <div className="card-body">
        <div className="card-actions justify-around">
          <div>
            <h2 className="text-lg">{title}</h2>
            <p>{year}</p>
          </div>
          <a className="btn btn-primary" href={`/${id}`}>
            Find out more
          </a>
        </div>
      </div>
    </div>
  )
}
