import { Calendar, Mail, Phone, MapPin, User } from "lucide-react";

const StaffCard = ({ member, onStaffClick }) => {
  return (
    <div
      onClick={() => onStaffClick(member._id)}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-100 group p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar Icon */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.position}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            member.department === "HR"
              ? "bg-purple-100 text-purple-800"
              : member.department === "IT"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {member.department}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 mr-2">
            <Mail className="w-4 h-4 text-blue-600" />
          </span>
          <span>{member.email}</span>
        </div>
        <div className="flex items-center">
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 mr-2">
            <Phone className="w-4 h-4 text-green-600" />
          </span>
          <span>{member.phone}</span>
        </div>
        <div className="flex items-center">
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-red-100 mr-2">
            <MapPin className="w-4 h-4 text-red-600" />
          </span>
          <span>{member.address}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center">
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 mr-2">
          <Calendar className="w-4 h-4 text-gray-500" />
        </span>
        Joined: {new Date(member.dateOfJoining).toLocaleDateString()}
      </div>
    </div>
  );
};

export default StaffCard;
