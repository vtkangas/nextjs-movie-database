'use client'

import MovieCard from './MovieCard';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface MovieCardData {
    movie_id : string
    image : string
    name : string
    genre : string[]
    year : number
}

export default function Watchlist() {

    const [movies, setMovies] = useState<any>();
    const supabase = createClientComponentClient();

    const updateWatchlist = async () : Promise<void> => {

        const userId = (await supabase.auth.getSession()).data.session?.user.id

        
        setMovies(await supabase.from('watchlist').select('*').eq('user_id', userId).order('id'));

    }

    const subscribeChannel = supabase.channel('schema-db-changes')
        .on('postgres_changes', 
            {
                event : '*',
                schema : 'public'
            }, 
            updateWatchlist
            )
        .subscribe()

    useEffect(() => {

        updateWatchlist();

    } , []);

    return (
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>

        {(movies)
            ? (!movies.error)
                ? movies.data.map((movie : MovieCardData, idx : number) => {
                    return (
                        <MovieCard 
                            key={idx} 
                            id={movie.movie_id}
                            image={movie.image}
                            name={movie.name}
                            genre={movie.genre}
                            year={movie.year}
                        />
                    )
                })
                : <p>Tapahtui virhe</p>
            : <p>Ladataan...</p>
        }

      </div>
    );
}