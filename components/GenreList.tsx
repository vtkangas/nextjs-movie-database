import Link from 'next/link';
import { genres } from '@/lib/genres'

export default function GenreList() {

    return (
        < >
            <ul>
                <h3 className='text-lg ml-4 border-b-2'>Genret</h3>
                {Object.entries(genres).map(([key, value]) => (
                
                    <li className='font-main text-black text-sm dark:text-white' key={key}>
                        <Link  className='rounded py-2'
                            href={`${key}/1`}
                        >
                            {value}
                        </Link>
                    </li>
                ))}

            </ul>
        </>
    );
}
