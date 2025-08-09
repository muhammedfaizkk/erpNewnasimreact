import { Link } from "react-router-dom";

const DashboardHome = ({ onClose }) => {
  return (
    <div className="flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#0A2239] p-6 rounded-b-3xl text-white relative">
        <div className="flex justify-end">
          <Link
            to="/admin"
            onClick={onClose}
            className="bg-gray-800 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-700 transition"
          >
            Welcome back →
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6 flex-1">
        <h2 className="text-lg font-semibold text-gray-800">App Options</h2>

        <div className="grid grid-cols-3 gap-4">
          {/* Dashboard */}
          <Link
            to="/"
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl flex flex-col items-center justify-center"
          >
            🏠
            <span className="mt-2 font-medium">Dashboard</span>
          </Link>

          {/* Reports */}
          <Link
            to="/admin/reports"
            onClick={onClose}
            className="bg-indigo-100 hover:bg-indigo-200 p-4 rounded-xl flex flex-col items-center justify-center"
          >
            📊
            <span className="mt-2 font-medium">Reports</span>
          </Link>

          {/* Sites - General */}
          <Link
            to="/admin/genaral"
            onClick={onClose}
            className="bg-yellow-100 hover:bg-yellow-200 p-4 rounded-xl flex flex-col items-center justify-center"
          >
            ⚙️
            <span className="mt-2 font-medium">General (Sites)</span>
          </Link>

          {/* Sites - Site */}
          <Link
            to="/admin/sites"
            onClick={onClose}
            className="bg-green-100 hover:bg-green-200 p-4 rounded-xl flex flex-col items-center justify-center"
          >
            🏢
            <span className="mt-2 font-medium">Site</span>
          </Link>

          {/* Staffs - All Staff */}
          <Link
            to="/admin/staffs"
            onClick={onClose}
            className="bg-blue-100 hover:bg-blue-200 p-4 rounded-xl flex flex-col items-center justify-center"
          >
            👥
            <span className="mt-2 font-medium">All Staff</span>
          </Link>

          {/* Quotations */}
          <Link
            to="/admin/quotation"
            onClick={onClose}
            className="bg-purple-100 hover:bg-purple-200 p-4 rounded-xl flex flex-col items-center justify-center"
          >
            📄
            <span className="mt-2 font-medium">Quotations</span>
          </Link>

          {/* Settings - Profile */}
          <Link
            to="/admin/profile"
            onClick={onClose}
            className="bg-pink-100 hover:bg-pink-200 p-4 rounded-xl flex flex-col items-center justify-center"
          >
            🛠️
            <span className="mt-2 font-medium">Profile</span>
          </Link>

          {/* Logout */}
          <Link
            to="/login"
            onClick={() => {
              localStorage.clear();
              onClose();
            }}
            className="bg-red-100 hover:bg-red-200 p-4 rounded-xl flex flex-col items-center justify-center"
          >
            🚪
            <span className="mt-2 font-medium">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
