import { Movie } from "@/lib/movies";
import Image from "next/image";
import BackButton from "./BackButton";
import WatchlistButton from "./WatchlistButton";

interface Props {
  movie: Movie;
  tmdbData: any;
}

export default function MoviePage({ movie, tmdbData }: Props) {
  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const hoursAndMinutes = `${hours}h ${minutes}m`;

    return hoursAndMinutes;
  };

  return (
    <>
      <div className="grid grid-row lg:grid-cols-2 gap-4">
        <div className="grid justify-items-center">
          <Image
            src={`https://image.tmdb.org/t/p/w342/${movie.tmdbkuva}`}
            width={500}
            height={750}
            alt={movie.alkuperainennimi}
            className="object-cover rounded w-auto h-[80vh]"
          />
        </div>
        <div className="grid grid-rows-5 gap-2">
          <div className="row-span-2">
            <h1 className="text-3xl">{movie.nimi}</h1>
            <h3 className="text-xl">
              {movie.nimi != movie.alkuperainennimi
                ? `(${movie.alkuperainennimi})`
                : null}
            </h3>
            <div className="relative h-20 overflow-hidden">
              {tmdbData.translations.translations.filter(function (
                translation: any
              ) {
                return translation.name === "suomi";
              }).length > 0 ? (
                <p className="kuvaus">
                  {
                    tmdbData.translations.translations.find(
                      (translation: { name: string }) =>
                        translation.name === "suomi"
                    ).data.overview
                  }
                </p>
              ) : tmdbData.overview.length > 0 ? (
                <p className="kuvaus">{tmdbData.overview}</p>
              ) : null}

              <div className="absolute w-full py-6 px-4 bottom-0 inset-x-0 bg-gradient-to-t from-violet-50 dark:from-black"></div>
            </div>
            <div className="text-right">
              <label
                htmlFor="descriptionModal"
                className="cursor-pointer text-blue-600 underline"
              >
                Lue lisää...
              </label>
            </div>
          </div>
          <div className="grid grid-row row-span-2">
            <p>{movie.genre.join(", ")}</p>
            <p>{movie.valmistumisvuosi}</p>
            <p>
              {movie.kestomin < 60
                ? `${movie.kestomin}m`
                : toHoursAndMinutes(movie.kestomin)}
            </p>
            <p>
              Näyttelijät:{" "}
              {tmdbData.credits.cast
                .slice(0, 5)
                .map(function (actor: { name: string }) {
                  return actor.name;
                })
                .join(", ")}
            </p>
            <p>Ohjaaja: {movie.ohjaaja.toString()}</p>
          </div>
          <div className="row-span-1 mt-auto mb-2">
            <WatchlistButton
              movieId={String(movie._id)}
              image={movie.tmdbkuva}
              name={movie.nimi.length > 0 ? movie.nimi : movie.alkuperainennimi}
              genre={movie.genre}
              year={movie.valmistumisvuosi}
            />
            <BackButton />
          </div>
        </div>
      </div>

      <input type="checkbox" id="descriptionModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-violet-50 dark:bg-neutral-900">
          <h1 className="text-3xl">{movie.nimi}</h1>

          <h3 className="text-lg">
            {movie.nimi != movie.alkuperainennimi
              ? `(${movie.alkuperainennimi})`
              : null}
          </h3>

          <div className="py-4">
            {tmdbData.translations.translations.filter(function (
              translation: any
            ) {
              return translation.name === "suomi";
            }).length > 0 ? (
              <p className="kuvaus">
                {
                  tmdbData.translations.translations.find(
                    (translation: { name: string }) =>
                      translation.name === "suomi"
                  ).data.overview
                }
              </p>
            ) : tmdbData.overview.length > 0 ? (
              <p className="kuvaus">{tmdbData.overview}</p>
            ) : null}
          </div>

          <div className="modal-action">
            <label htmlFor="descriptionModal" className="btn">
              Takaisin
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
