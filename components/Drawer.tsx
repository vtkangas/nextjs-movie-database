'use client'

import Navbar from '@/components/Navbar';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation'

function Drawer({ children }: { children: React.ReactNode }) : React.ReactElement {

    const pathname = usePathname();

    const showDrawer : boolean = (pathname?.startsWith("/auth") || pathname?.startsWith("/account")) || pathname?.startsWith("/admin") ? false : true;

    return (
        <div className="drawer drawer-mobile">
            <input
                id="my-drawer-3"
                type="checkbox"
                className="drawer-toggle" 
            />
            <div className="drawer-content flex flex-col">
                {/* page content here */}

                {showDrawer && 
                    <div className='sticky top-0 z-50'>

                        <Navbar />

                    </div>
                }           

                <div className='grid'>

                    {children}

                </div>

            </div>

            {showDrawer && <Sidebar />}

        </div>
    )
}

export default Drawer;