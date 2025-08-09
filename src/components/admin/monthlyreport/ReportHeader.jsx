import { FiRefreshCw } from 'react-icons/fi';

const ReportHeader = ({ title, period, loading, onRefresh }) => {
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : '';
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 text-sm mt-1">
              {period ? `${formatDate(period.start)} - ${formatDate(period.end)}` : 'Select a date range and click Apply'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="hidden sm:inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? <FiRefreshCw className="animate-spin mr-2" /> : null}
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;