import Image from 'next/image';
import logo from '@/public/images/logoWhite.png';
import Link from 'next/link';

export default function LogoLink() {

    return (
          <Link href='/'>
            <Image 
              src={logo} 
              width={114.8}
              height={26.4}
              alt='xamkflix_logo'
              className='transition-all ease-in-out w-[120px] h-auto hover:w-[130px] hover:h-auto active:w-[125px] active:h-auto'
              priority
            />
          </Link>
    );
}