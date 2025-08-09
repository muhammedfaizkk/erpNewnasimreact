import React, { useState } from 'react';
import {
  FaChartBar, FaFileInvoice,
  FaTimes, FaChevronDown, FaChevronUp, FaHome, FaUsers,
  FaCog, FaStore, FaSignOutAlt, FaPlus
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const [dropdowns, setDropdowns] = useState({
    reports: false,
    sites: false,
    staffs: false,
    generalSettings: false,
  });

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      {/* Full Sidebar for medium screens and above */}
      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-40 h-full bg-white shadow-lg w-64 transition-transform duration-300`}>
        <div className="flex flex-col h-full p-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>

          <div className="mb-8 flex justify-center">
            <img src="/logonav.png" className='h-28 w-28' alt="Logo" />
          </div>

          <nav className="space-y-1 flex-1">
            {/* Dashboard */}
            <div onClick={() => navigateTo('/')} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
              <FaHome className="mr-3" />
              <span>Dashboard</span>
            </div>

            {/* Reports Dropdown */}
            <div>
              <div onClick={() => toggleDropdown('reports')} className="flex items-center justify-between p-3 bg-blue-50 text-blue-600 rounded-md cursor-pointer">
                <div className="flex items-center">
                  <FaChartBar className="mr-3" />
                  <span>Reports</span>
                </div>
                {dropdowns.reports ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div className={`ml-10 overflow-hidden transition-all duration-300 ease-in-out ${dropdowns.reports ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div onClick={() => navigateTo('/admin/reports')} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">View Reports</div>
              </div>
            </div>

            {/* Sites Dropdown */}
            <div>
              <div onClick={() => toggleDropdown('sites')} className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
                <div className="flex items-center">
                  <FaStore className="mr-3" />
                  <span>Sites</span>
                </div>
                {dropdowns.sites ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div className={`ml-10 overflow-hidden transition-all duration-300 ease-in-out ${dropdowns.sites ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div onClick={() => navigateTo('/admin/genaral')} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">General</div>
                <div onClick={() => navigateTo('/admin/sites')} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Site</div>
              </div>
            </div>

            {/* Staffs Dropdown */}
            <div>
              <div onClick={() => toggleDropdown('staffs')} className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
                <div className="flex items-center">
                  <FaUsers className="mr-3" />
                  <span>Staffs</span>
                </div>
                {dropdowns.staffs ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div className={`ml-10 overflow-hidden transition-all duration-300 ease-in-out ${dropdowns.staffs ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div onClick={() => navigateTo('/admin/staffs')} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">All Staff</div>
              </div>
            </div>

            <div onClick={() => navigateTo('/admin/quotation')} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
              <FaFileInvoice className="mr-3" />
              <span>Quotations</span>
            </div>

            {/* Settings */}
            <div>
              <div onClick={() => toggleDropdown('generalSettings')} className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
                <div className="flex items-center">
                  <FaCog className="mr-3" />
                  <span>Settings</span>
                </div>
                {dropdowns.generalSettings ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div className={`ml-10 overflow-hidden transition-all duration-300 ease-in-out ${dropdowns.generalSettings ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div onClick={() => navigateTo('/admin/profile')} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Profile</div>
              </div>
            </div>
          </nav>

          {/* Logout Option */}
          <div className="mt-auto pt-6 border-t">
            <div onClick={handleLogout} className="flex items-center p-3 text-red-600 hover:bg-red-50 rounded-md cursor-pointer">
              <FaSignOutAlt className="mr-3" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Sidebar;