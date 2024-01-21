import './globals.css';
import { Movie, getLatestMovies } from '@/lib/movies';
import MovieList from '@/components/MovieList';
import SortList from '@/components/SortList';
import Carousel from '@/components/Carousel';


export default async function Home() {

  const movies : Movie[] = await getLatestMovies();

  return (
    <>
      <Carousel />

      <div className='page'>
                    
        <h2 className='text-4xl'>Uusimmat</h2>

        <SortList path={"/uusimmat"}/>
            
        <MovieList movies={movies}/>
            
      </div>
    </>
  )
}
