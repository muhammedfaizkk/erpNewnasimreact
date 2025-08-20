import { Calendar, Mail, Phone, MapPin } from "lucide-react";

const StaffCard = ({ member, onStaffClick }) => {
  return (
    <div
      onClick={() => onStaffClick(member._id)}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-100 group p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.position}</p>
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
          <Mail className="w-4 h-4 mr-2 text-blue-500" />
          <span>{member.email}</span>
        </div>
        <div className="flex items-center">
          <Phone className="w-4 h-4 mr-2 text-green-500" />
          <span>{member.phone}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-red-500" />
          <span>{member.address}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center">
        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
        Joined: {new Date(member.joinDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default StaffCard;
