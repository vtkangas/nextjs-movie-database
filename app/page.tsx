import "./globals.css";
import { Movie, getLatestMovies } from "@/lib/movies";
import MovieList from "@/components/MovieList";
import SortList from "@/components/SortList";
import Carousel from "@/components/Carousel";

export default async function Home() {
  const movies: Movie[] = await getLatestMovies();

  return (
    <>
      <Carousel />

      <div className="page">
        <div className="header-container">
          <div className="header-content">
            <h2 className="text-4xl">Uusimmat</h2>
          </div>
          <div className="sortlist-container">
            <SortList path={"/uusimmat"} />
          </div>
        </div>

        <MovieList movies={movies} />
      </div>
    </>
  );
}
