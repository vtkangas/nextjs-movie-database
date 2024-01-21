import "@/app/globals.css";
import { Movie, getMovieById } from "@/lib/movies";
import { getTmbdData } from "@/lib/tmdbData";
import MovieView from "@/components/MovieView";

interface Props {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: Props) {
  const movie: Movie = await getMovieById(params.id);
  const tmdbData: any = await getTmbdData(movie.tmdbid);

  return (
    <div className="page">
      <MovieView movie={movie} tmdbData={tmdbData} />
    </div>
  );
}
