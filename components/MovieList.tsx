import { Movie } from '@/lib/movies';
import MovieCard from './MovieCard';

interface Props {
  movies : Movie[]
}

export default function MovieList({ movies } : Props) {

    return (
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>

        {movies.map((movie : Movie, idx : number) => {
          
          return (
            <MovieCard 
              key={idx} 
              id={movie._id.toString()}
              image={movie.tmdbkuva}
              name={(movie.nimi.length > 0) ? movie.nimi : movie.alkuperainennimi}
              genre={movie.genre}
              year={movie.valmistumisvuosi}
            />
          )

        })}

      </div>
    );
}