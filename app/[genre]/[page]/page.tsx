import "@/app/globals.css";
import { Movie, getMoviesByGenre, getCount } from "@/lib/movies";
import { genres } from "@/lib/genres";
import SortList from "@/components/SortList";
import MovieList from "@/components/MovieList";
import Pagination from "@/components/Pagination";

interface Props {
  params: {
    genre: keyof typeof genres;
    page: number;
  };
}

export default async function GenrePage({ params }: Props) {
  const genre: string = genres[params.genre];
  const page: number = Number(params.page);

  const movies: Movie[] = await getMoviesByGenre(genre, page);
  const moviesCount = await getCount(genre);

  return (
    <div className="page">
      <div className="header-container">
        <div className="header-content">
          <h2 className="text-4xl">{genre}</h2>
        </div>
        <div className="sortlist-container">
          <SortList path={`/${params.genre}/1/`} />
        </div>
      </div>

      <MovieList movies={movies} />

      <Pagination
        moviesCount={moviesCount}
        currentPage={page}
        genre={params.genre}
      />
    </div>
  );
}
