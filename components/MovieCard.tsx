import Link from "next/link";
import Image from "next/image";
import WatchlistButtonMini from "./WatchlisButtonMini";

interface Props {
  id: string;
  image: string;
  name: string;
  genre: string[];
  year: number;
}

export default function MovieCard({ id, image, name, genre, year }: Props) {
  return (
    <div className="relative overflow-hidden rounded shadow-lg max-h-[80dvh]">
      <div className="absolute top-1 right-1">
        <WatchlistButtonMini
          movieId={id}
          image={image}
          name={name}
          genre={genre}
          year={year}
        />
      </div>

      <Link href={`/movie/${id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w342/${image}`}
          width={250}
          height={375}
          alt={name}
          className="object-cover w-full h-auto max-h-screen object-top"
        />

        <div className="absolute w-full pb-6 pt-12 px-3 bottom-0 inset-x-0 text-white text-center bg-gradient-to-t from-gray-950 from-40% to-transparent to-100%">
          <h3 className="text-xl">{name}</h3>
          <p className="text-base">
            {genre[0]} {year}
          </p>
        </div>
      </Link>
    </div>
  );
}
