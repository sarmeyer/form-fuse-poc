import { MovieDetails } from "@/components/MovieDetails"

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="h-screen w-screen">
      <MovieDetails id={params.id} />
    </div>
  )
}
