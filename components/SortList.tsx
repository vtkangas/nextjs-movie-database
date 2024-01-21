import Link from 'next/link';

interface Props {
    path : string
}

export default function SortList({ path } : Props) {

    return (
            <div className='w-full'>
                <Link className='font-main inline-block p-2 mr-4' href={`${path}/name-asc`}>Järjestä nimellä (A-Ö)</Link>
                <Link className='font-main inline-block p-2 mr-4' href={`${path}/name-desc`}>Järjestä nimellä (Ö-A)</Link>
                <Link className='font-main inline-block p-2 mr-4' href={`${path}/date-desc`}>Uusin lisäys ensin</Link>
                <Link className='font-main inline-block p-2 mr-4' href={`${path}/date-asc`}>Vanhin lisäys ensin</Link>
            </div>  
    );
}