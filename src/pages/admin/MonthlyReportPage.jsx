import { useState, useCallback } from "react";
import { useFetchFullSiteStaffReport } from '../../hooks/report/Reporthooks';
import DateFilter from '../../components/admin/filters/DateFilter';
import MobileFilterButton from '../../components/admin/monthlyreport/MobileFilterButton';
import ReportHeader from '../../components/admin/monthlyreport/ReportHeader';
import ReportDisplay from '../../components/admin/monthlyreport/ReportDisplay';
import { FiFilter } from 'react-icons/fi';

const MonthlyReportPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [localStartDate, setLocalStartDate] = useState('');
  const [localEndDate, setLocalEndDate] = useState('');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showDesktopFilter, setShowDesktopFilter] = useState(false);

  const { report, loading, error, fetchReport } = useFetchFullSiteStaffReport(startDate, endDate);

  const handleApplyDateFilter = useCallback(() => {
    setStartDate(localStartDate);
    setEndDate(localEndDate);
    setShowMobileFilter(false);
    setShowDesktopFilter(false);
  }, [localStartDate, localEndDate]);

  const handleClearDateFilter = useCallback(() => {
    setLocalStartDate('');
    setLocalEndDate('');
    setStartDate('');
    setEndDate('');
  }, []);

  const handleOpenDesktopFilter = () => {
    setShowDesktopFilter(true);
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
  };

  const handleCloseDesktopFilter = () => {
    setShowDesktopFilter(false);
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
  };

  const handleRefresh = useCallback(() => {
    fetchReport(startDate, endDate);
  }, [fetchReport, startDate, endDate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <span className="w-5 h-5 text-red-600">!</span>
            <div>
              <h3 className="text-red-800 font-medium">Error Loading Report</h3>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative box-border">
      <ReportHeader
        title="Monthly Report"
        period={report?.period}
        loading={loading}
        onRefresh={handleRefresh}
      />

      <div className="w-full max-w-6xl mx-auto px-2 py-4 sm:px-4 sm:py-6">
        {/* Desktop Filter Button */}
        <div className="hidden sm:block mb-6 flex justify-end">
          {!showDesktopFilter ? (
            <button
              onClick={handleOpenDesktopFilter}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
            >
              <FiFilter className="w-4 h-4" />
              Open Filter
            </button>
          ) : (
            <DateFilter
              startDate={localStartDate}
              endDate={localEndDate}
              onStartDateChange={setLocalStartDate}
              onEndDateChange={setLocalEndDate}
              onApply={handleApplyDateFilter}
              onClear={handleClearDateFilter}
              onClose={handleCloseDesktopFilter}
            />
          )}
        </div>

        {/* Report Content */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <ReportDisplay report={report} loading={loading} />
        </div>
      </div>

      <MobileFilterButton onClick={() => setShowMobileFilter(true)} />

      {/* Mobile Filter Overlay */}
      {showMobileFilter && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg p-4">
            <DateFilter
              startDate={localStartDate}
              endDate={localEndDate}
              onStartDateChange={setLocalStartDate}
              onEndDateChange={setLocalEndDate}
              onApply={handleApplyDateFilter}
              onClear={handleClearDateFilter}
              onClose={() => setShowMobileFilter(false)}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyReportPage;