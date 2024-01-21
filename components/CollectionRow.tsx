import { createClient } from '@supabase/supabase-js'
import React from 'react'

interface Props {
    collection : any
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

function CollectionRow( {collection} : Props ) : React.ReactElement {
  
  

  return (
    <li className='p-2 mb-1'>
        <input 
            type="checkbox" 
            className='m-2'
            defaultChecked={Boolean(collection.published)}
            onClick={() => console.log("joo")} 
        />
        {collection.collection_name}
        {collection.movie_ids.join(", ")}
    </li>
  )
}

export default CollectionRow