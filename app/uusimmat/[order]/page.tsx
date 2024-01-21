import "@/app/globals.css";
import { Movie, sortMovies } from "@/lib/movies";
import MovieList from "@/components/MovieList";
import SortList from "@/components/SortList";

interface Props {
  params: {
    order: string;
  };
}

export default async function NewestPage({ params }: Props) {
  const movies: Movie[] = await sortMovies(params.order);

  return (
    <div className="page">
      <h2 className="text-3xl">Uusimmat</h2>

      <SortList path={"/uusimmat"} />

      <MovieList movies={movies} />
    </div>
  );
}
