import { Movie } from '@/lib/movies';
import Link from 'next/link';
import Image from 'next/image';
import WatchlistButton from './WatchlistButton';

interface Props {
    id : string
    image : string
    name : string
    genre : string[]
    year : number
}

export default function MovieCard({ id, image, name, genre, year } : Props) {

    return (
        
            <div className='relative overflow-hidden rounded shadow-lg'>
                {/*
                
                <div className='absolute top-1 right-1'>
                    <WatchlistButton movieId={id} image={image} name={name} genre={genre} year={year}/>
                </div>
                
                */}
                <Link href={`/movie/${id}`}>
                    <Image 
                        src={`https://image.tmdb.org/t/p/w342/${image}`} 
                        width={250} 
                        height={375} 
                        alt={name} 
                        className='object-cover w-full h-auto'
                    />
                
                <div className='absolute w-full py-6 px-4 bottom-0 inset-x-0 text-white text-center bg-gradient-to-t from-black'>
                    <h3 className='text-xl'>
                        {name}
                    </h3>
                    <p className='text-base'> 
                        {genre[0]} {year}
                    </p>
                </div>
                </Link>
            </div>
        
    );
}