import LogoLink from './LogoLink';

export default function SidebarNav() {

    return (
      <div className='navbar bg-neutral-900 p-4 mb-6 w-full h-20 drop-shadow-lg justify-items-center'>
        <div className='navbar-start'>
          <LogoLink />
        </div>
      </div>
    );
}