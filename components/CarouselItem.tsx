import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Props {
    itemId : String
    imageSrc : StaticImageData
    title : String
    year : String
    genres : String
    runtime : String
    movieId : String
}

export default function CarouselItem({ itemId, imageSrc, title, year, genres, runtime, movieId } : Props) {

    return (
            <div id={`${itemId}`} className="relative carousel-item w-full">
                <Image 
                    src={imageSrc} 
                    width={960} 
                    height={540} 
                    alt={`${title}`} 
                    className='w-full h-auto'
                    priority
                />
                    
                <div className='absolute grid grid-row gap-2 content-center h-full w-full p-24'>
                        <h1 className=' text-white text-3xl sm:text-5xl'>{title}</h1>
                        <ul className='list-disc list-inside mt-2 font-main text-white text-lg hidden sm:block'>
                            <li className='border-solid border-2 mr-2 py-1 px-2 inline'>{year}</li>
                            <li className='border-solid border-2 mr-2 py-1 px-2 inline'>{genres}</li>
                            <li className='border-solid border-2 mr-2 py-1 px-2 inline'>{runtime}</li>
                        </ul>
                        <div>
                            <Link 
                                href={`/movie/${movieId}`} 
                                className='btn btn-sm rounded-none bg-white font-main text-md text-slate-600 hover:bg-black hover:text-white sm:btn-md sm:btn-wide sm:mt-8'
                            >
                                Siirry
                            </Link>
                        </div>
                </div>
            </div>
    );
}