import GenreList from '@/components/GenreList';
import SidebarNav from './SidebarNav';

function Sidebar() : React.ReactElement {

    return (
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <div className="menu w-80 bg-violet-50 dark:text-white dark:bg-black border-r-2">
                    {/*drawer content here*/}

                    <div className='hidden lg:block sticky top-0 z-50'>

                        <SidebarNav />

                    </div>
                    <div className='px-4 mb-6 mt-4'>

                        <GenreList />

                    </div>

                </div>
            </div>
    )
}

export default Sidebar;