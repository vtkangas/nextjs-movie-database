import { getCollectionMovies, Movie } from '@/lib/movies';
import MovieCard from './MovieCard';

interface Props {
  collection : any
}

export default async function MovieCollection({ collection } : Props) {

    const movies : Movie[] = await getCollectionMovies(collection.movie_ids)

    return (
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>

        <h2 className='text-4xl'>{collection.collection_name}</h2>


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