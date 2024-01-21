import Link from "next/link";

interface Props {
    moviesCount : number 
    currentPage : number 
    genre : string 
    order? : string
}

export default function Pagination({ moviesCount, currentPage, genre, order } : Props) {

    const pagesCount : number = Math.ceil(moviesCount / 40);
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    const sortOrder = order ? order : "";

    return (
        <div className="btn-group place-content-center mt-4">
            <Link 
                href={`${genre}/${currentPage - 1}/${sortOrder}`} 
                className={(currentPage === 1 ? 'btn btn-disabled' : 'btn')}
            >«
            </Link>
            {/** go to page */}
            <div className="dropdown dropdown-top">
                <label 
                    tabIndex={0} 
                    className="btn w-52" 
                    style={{borderRadius: 0}}>
                        Page {currentPage} of {pages.length}
                    </label>
                    <div 
                        tabIndex={0} 
                        className='dropdown-content text-white menu p-2 shadow bg-base-100 w-52 overflow-y-scroll h-40'
                    >
                        <ul>
                            {pages.map((page) => (
                                <li
                                    key={page}
                                >
                                <Link href={`${genre}/${page}/${sortOrder}`}>
                                    Go to Page {page}
                                </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
            </div>
            <Link href={`${genre}/${currentPage + 1}/${sortOrder}`} className={currentPage === pages.length ? 'btn btn-disabled' : 'btn'}>»</Link>
        </div>
    );
    
}