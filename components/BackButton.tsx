'use client'

import { useRouter } from "next/navigation"


export default function BackButton() {

  const router = useRouter()

  return (

      <button 
        className='btn w-full' 
        onClick={() => router.back()}
      >
        Palaa listaukseen
      </button>

  )

}