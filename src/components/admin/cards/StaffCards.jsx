import StaffCard from './StaffCard';

const StaffCards = ({ staff, onStaffClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staff.map((member) => (
        <StaffCard 
          key={member.id} 
          member={member} 
          onStaffClick={onStaffClick} 
        />
      ))}
    </div>
  );
};

export default StaffCards;