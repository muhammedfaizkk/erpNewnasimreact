import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/layout/Sidebar';
import MobileNav from '../components/admin/layout/MobileNav';

function AdminLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const sidebarRef = useRef();

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                mobileMenuOpen
            ) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mobileMenuOpen]);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden relative">
            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-64 z-40 bg-white shadow-md transition-transform transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:static md:block`}
            >
                <Sidebar isOpen={mobileMenuOpen} />
            </div>

            {/* Mobile Nav */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50">
                <MobileNav toggleMenu={toggleMobileMenu} isMenuOpen={mobileMenuOpen} />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-0 mt-14 md:mt-0 h-full overflow-y-auto p-4">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;
