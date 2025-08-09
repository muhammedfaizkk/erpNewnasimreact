import React from 'react';
import StaffAdvancePayment from '../../../components/admin/StaffAdvancePayment';

const StaffAdvancesTab = ({ 
  staffId, 
  staffAdvances, 
  advancesLoading, 
  dateFilter,
  handleRefreshAdvances = () => {}
}) => {
  return (
    <StaffAdvancePayment 
      staffId={staffId} 
      advances={staffAdvances || []} 
      loading={advancesLoading} 
      dateFilter={dateFilter}
      onRefresh={handleRefreshAdvances}
    />
  );
};

export default StaffAdvancesTab;