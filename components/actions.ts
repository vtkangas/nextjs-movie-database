'use server'
import { getCollectionMovies, Movie } from '@/lib/movies';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);


export const createCollection = async (collectionName: string, movies: string[]) : Promise<void> => {

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  
    const pariLefaa : Movie[] = await getCollectionMovies(movies)
    console.log(pariLefaa)
  
    const {data, error} = await supabase.from('collections').insert(
        [{
            collection_name : collectionName,
            movie_ids : movies,
            published : false
        }]
    )
  
    if (error){
        console.log(error)
    }
  
  }