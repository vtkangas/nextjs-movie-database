'use client'

import { useRouter } from 'next/navigation'
import Poirot from '@/public/images/DeathOnTheNile.jpg';
import Beasts from '@/public/images/FantasticBeasts.jpg';
import Moonfall from '@/public/images/Moonfall.jpg';
import CarouselItem from './CarouselItem';


export default function Carousel() {

    const router = useRouter()

    return (
        <>
        <div className="carousel carousel-center w-full">

            <CarouselItem 
                itemId={"item1"} 
                imageSrc={Poirot} 
                title={"Kuolema Niilillä"} 
                year={"2022"} 
                genres={"Rikos, Draama, Mysteeri"} 
                runtime={"2h 7m"}
                movieId={"63e0f5066260ea96a0be6b30"}
            />
            
            <CarouselItem 
                itemId={"item2"} 
                imageSrc={Beasts} 
                title={"Ihmeotukset: Dumbledoren salaisuudet"} 
                year={"2022"} 
                genres={"Seikkailu, Perhe, Fantasia"} 
                runtime={"2h 22m"}
                movieId={"63e0f5066260ea96a0be6b35"}
            />

            <CarouselItem 
                itemId={"item3"} 
                imageSrc={Moonfall} 
                title={"Moonfall"} 
                year={"2022"} 
                genres={"Toiminta, Seikkailu, Sci-Fi"} 
                runtime={"2h 10m"}
                movieId={"63e0f5066260ea96a0be6b4a"}
            />
            
        </div> 
        <div className="flex justify-center w-full py-2 gap-2">
            <a href="#item1" onClick={() => router.replace('/#item1')} className="btn btn-xs">1</a> 
            <a href="#item2" onClick={() => router.replace('/#item2')} className="btn btn-xs">2</a> 
            <a href="#item3" onClick={() => router.replace('/#item3')} className="btn btn-xs">3</a> 
        </div>
        </>
    );
}