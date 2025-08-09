import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/layout/Sidebar';
import DashboardHome from '../components/admin/layout/DashboardHome';
import { FiMenu, FiX } from 'react-icons/fi';

function AdminLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showDashboardHome, setShowDashboardHome] = useState(false);
    const sidebarRef = useRef();
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
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
            {/* Sidebar - desktop and mobile slide-in */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-64 z-40 bg-white shadow-md transition-transform transform
                    ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:static md:block`}
            >
                <Sidebar isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
            </div>

            {/* Mobile Header - only on mobile */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowDashboardHome(true)}
                            className="text-gray-700 focus:outline-none mr-2"
                        >
                            <FiMenu className="h-6 w-6" />
                        </button>
                        <img src="/logonav.png" alt="Logo" className="h-8 w-8 object-contain" />
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-red-600 font-semibold px-3 py-1 rounded hover:bg-red-50 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* DashboardHome Overlay (Mobile Only) */}
            {showDashboardHome && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-start md:hidden overflow-y-auto">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg mt-16 max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={() => setShowDashboardHome(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 z-10"
                        >
                            <FiX className="h-6 w-6" />
                        </button>
                       <DashboardHome onClose={() => setShowDashboardHome(false)} />

                    </div>
                </div>

            )}

            {/* Main Content */}
            <div className="flex-1 ml-0 mt-14 md:mt-0 h-full overflow-y-auto p-4">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;
