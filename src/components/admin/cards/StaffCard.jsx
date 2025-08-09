import { Calendar, Mail, Phone, MapPin } from 'lucide-react';

const StaffCard = ({ member, onStaffClick }) => {
  return (
    <div
      onClick={() => onStaffClick(member._id)}
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer p-6"
    >
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-600">{member.position}</p>
          <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
            {member.department}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2" />
          {member.email}
        </div>
        <div className="flex items-center">
          <Phone className="w-4 h-4 mr-2" />
          {member.phone}
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          {member.address}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          Joined: {new Date(member.joinDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default StaffCard;