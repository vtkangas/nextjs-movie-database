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
  // const order : string = 'date-desc'

  const movies: Movie[] = await getMoviesByGenre(genre, page);
  const moviesCount = await getCount(genre);

  return (
    <div className="page">
      <h2 className="text-3xl">{genre}</h2>

      <SortList path={`/${params.genre}/1/`} />

      <MovieList movies={movies} />

      <Pagination
        moviesCount={moviesCount}
        currentPage={page}
        genre={params.genre}
      />
    </div>
  );
}
