'use client'

import { getCollectionMovies, Movie } from '@/lib/movies';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import MovieCard from './MovieCard';
import { createClient } from '@supabase/supabase-js'
import CollectionRow from './CollectionRow';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

interface MovieId {
    movieId : string
}

export default function CollectonCreator() {

    const [collectionName, setCollectionName] = useState<string>('');
    const [movieId, setMovieId] = useState<string>('');
    const [movies, setMovies] = useState<string[]>([]);

    const [collections, setCollections] = useState<any>();

    const update = async () : Promise<void> => {
        setCollections(await supabase.from('collections').select('*').order('id'));
    }

    const tilaaKanava = supabase.channel('schema-db-changes')
        .on('postgres_changes', 
            {
                event : '*',
                schema : 'public'
            }, 
            update
            )
        .subscribe()

    useEffect(() => {

        update();

    } , []);


    const handleCollectionNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCollectionName(event.target.value);
    };    
  
    const handleMovieIdChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setMovieId(event.target.value);
    };
    
    const addMovie = () => {
        if (movieId) {
            setMovies([...movies, movieId ]);
            setMovieId('');
        }
      
    }

    
    const createCollection = async () : Promise<void> => {

        const {data, error} = await supabase.from('collections').insert(
            [{
                collection_name : collectionName,
                movie_ids : movies,
                published : false
            }]
        )

        setCollectionName('');
        setMovies([]);

        if (error){
            console.log(error)
        }

    }

    return (
      <div className='grid m-6 gap-2'>

            <h2 className='text-4xl'>Luo nosto</h2>

            <div className="grid gap-2">
                <input
                    type="text"
                    value={collectionName}
                    onChange={handleCollectionNameChange}
                    placeholder="Listan nimi"
                    className='input input-bordered w-full'
                />
                <form>
                    <input 
                        type="text" 
                        value={movieId} 
                        onChange={handleMovieIdChange} 
                        className='input input-bordered w-full'
                    />
                    <button className="btn" type="button" onClick={addMovie}>
                    Lisää elokuva
                    </button>
                </form>

                <div>
                    <h2>Elokuvat:</h2>
                    <ul>
                        {movies.map((movie, index) => (
                            <li key={index}>{movie}</li>
                        ))}
                    </ul>
                    <button className="btn" type="button" onClick={createCollection}>
                        Luo lista
                    </button>

                </div>

                <ul className='mt-2'>

                    {(collections)
                        ? (!collections.error)
                            ? collections.data.map((collection : any, idx : number) => {
                            return <CollectionRow key={idx} collection={collection} />
                            })
                            : <>Virhe!</>
                        : <>Haetaan...</>
                    }

                </ul>



            </div>
          
      </div>
    );
}