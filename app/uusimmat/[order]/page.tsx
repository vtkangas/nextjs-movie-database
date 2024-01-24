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
      <div className="header-container">
        <div className="header-content">
          <h2 className="text-4xl m-0">Uusimmat</h2>
        </div>
        <div className="sortlist-container">
          <SortList path={"/uusimmat"} order={params.order} />
        </div>
      </div>

      <MovieList movies={movies} />
    </div>
  );
}
