import Image from 'next/image';
import logo from '@/public/images/logoWhite.png';
import Link from 'next/link';
import ThemeButton from '@/components/ThemeButton';
import UserMenu from './UserMenu';
import LogoLink from './LogoLink';

export default function Navbar() {

    return (
      <div className='navbar relative z-[1] bg-neutral-900 p-4 mb-6 w-full h-20 drop-shadow-lg justify-items-center'>
        <div className='navbar-start'>
          <div className="flex-none lg:hidden">
            <label 
              htmlFor="my-drawer-3" 
              className="btn btn-circle text-white hover:bg-white hover:text-slate-600 btn-ghost"
            >
              {/*menu-icon*/}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </label>
          </div> 
        </div>
        <div className='navbar-center lg:hidden'>
          <LogoLink />
        </div>
        <div className='navbar-end mr-4 space-x-2'>
          <UserMenu />
          <ThemeButton />
        </div>
      </div>
    );
}