import { Movie } from "@/lib/movies";
import Image from "next/image";
import BackButton from "./BackButton";
import MovieDescriptionBox from "./MovieDescriptionBox";
import WatchlistButton from "./WatchlistButton";

interface Props {
  movie: Movie;
  tmdbData: any;
}

export default function MovieView({ movie, tmdbData }: Props) {
  const minutesToHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const hoursAndMinutes = `${hours}h ${minutes}m`;

    return hoursAndMinutes;
  };

  const suomiTranslation = tmdbData.translations?.translations?.find(
    (translation: any) => translation.name === "suomi"
  );
  const description: string =
    suomiTranslation?.data?.overview || tmdbData?.overview || "";

  const genres: string = movie.genre?.join(", ") ?? "";
  const cast: string[] =
    tmdbData?.credits?.cast
      ?.slice(0, 5)
      .map((actor: { name: string }) => actor.name) || [];
  const formattedCast: string = cast.join(", ");
  const director: string =
    Array.isArray(movie.ohjaaja) && movie.ohjaaja.length > 0
      ? movie.ohjaaja.join(", ")
      : movie.ohjaaja?.toString() ?? "";
  const movieName: string = movie.nimi ?? "";

  return (
    <>
      <div className="grid grid-row lg:grid-cols-2 gap-4">
        <div className="flex justify-center items-center">
          <Image
            src={`https://image.tmdb.org/t/p/w342/${movie.tmdbkuva}`}
            width={500}
            height={750}
            alt={movie.alkuperainennimi}
            className="object-cover rounded w-auto align-middle"
          />
        </div>

        <div className="grid grid-rows-5">
          <div className="row-span-2">
            <h1 className="text-3xl">{movie.nimi}</h1>
            {movie.nimi !== movie.alkuperainennimi && (
              <h3 className="text-xl">({movie.alkuperainennimi})</h3>
            )}

            <MovieDescriptionBox description={description} />
          </div>

          <div className="grid grid-row row-span-2">
            <p>{genres}</p>
            <p>{movie.valmistumisvuosi}</p>
            <p>
              {movie.kestomin < 60
                ? `${movie.kestomin}m`
                : minutesToHoursAndMinutes(movie.kestomin)}
            </p>
            <p>Näyttelijät: {formattedCast}</p>
            <p>Ohjaaja: {director}</p>
          </div>

          <div className="row-span-1 mt-auto mb-2">
            <WatchlistButton
              movieId={String(movie._id)}
              image={movie.tmdbkuva}
              name={movieName}
              genre={movie.genre}
              year={movie.valmistumisvuosi}
            />
            <BackButton />
          </div>
        </div>
      </div>
    </>
  );
}
