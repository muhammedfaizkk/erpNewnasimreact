import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiUsers, FiCalendar, FiUser, FiBriefcase, FiClock, FiCreditCard, FiBarChart } from 'react-icons/fi';

const ReportDisplay = ({ report, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading report...</span>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-8">
        <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
        <p className="text-gray-600 mt-2">No report data available</p>
      </div>
    );
  }

  const { period, finance, staffReports, staffTotals } = report;

  // Format date for display
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  // Format currency
  const formatCurrency = (value) => `₹${(value || 0).toLocaleString('en-IN')}`;

  return (
    <div className="space-y-6 p-4">
      {/* Period Summary */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
          <FiCalendar className="text-blue-600" /> Report Period
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Start Date</p>
            <p className="font-medium">{formatDate(period.start)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">End Date</p>
            <p className="font-medium">{formatDate(period.end)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Days</p>
            <p className="font-medium">{period.totalDays || 0}</p>
          </div>
        </div>
      </section>

      {/* Finance Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="flex items-center gap-2 text-green-800 font-medium mb-2">
            <FiTrendingUp className="text-green-600" /> Total Income
          </h4>
          <p className="text-2xl font-bold text-green-700">{formatCurrency(finance.totalIncome)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="flex items-center gap-2 text-red-800 font-medium mb-2">
            <FiTrendingDown className="text-red-600" /> Total Expense
          </h4>
          <p className="text-2xl font-bold text-red-700">{formatCurrency(finance.totalExpense)}</p>
        </div>
        <div className={`p-4 rounded-lg border ${finance.balance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
          <h4 className={`flex items-center gap-2 font-medium ${finance.balance >= 0 ? 'text-blue-800' : 'text-red-800'}`}>
            <FiDollarSign className={finance.balance >= 0 ? 'text-blue-600' : 'text-red-600'} /> Balance
          </h4>
          <p className={`text-2xl font-bold ${finance.balance >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
            {formatCurrency(finance.balance)}
          </p>
        </div>
      </section>

      {/* Staff Summary */}
      <section className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <FiUsers className="text-purple-600" /> Staff Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Total Salary</p>
            <p className="text-xl font-bold text-purple-700">{formatCurrency(staffTotals.totalSalary)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Advance</p>
            <p className="text-xl font-bold text-purple-700">{formatCurrency(staffTotals.totalAdvance)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Balance</p>
            <p className="text-xl font-bold text-purple-700">{formatCurrency(staffTotals.balance)}</p>
          </div>
        </div>
      </section>

      {/* Staff Details */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Staff Details</h3>
        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Staff', 'Role', 'Daily Wage', 'Days Worked', 'Leave Days', 'Advance', 'Salary', 'Balance'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staffReports.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FiUser className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="ml-4 text-sm font-medium text-gray-900">{staff.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{staff.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(staff.dailyWage)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{staff.daysWorked}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{staff.leaveDays}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(staff.totalAdvance)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(staff.totalSalary)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">{formatCurrency(staff.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {staffReports.map((staff) => (
            <div key={staff.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUser className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{staff.name}</h4>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <FiBriefcase className="h-3 w-3" /> {staff.role}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <FiDollarSign className="h-4 w-4 text-gray-400" />
                  <span>Daily Wage: {formatCurrency(staff.dailyWage)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="h-4 w-4 text-gray-400" />
                  <span>Days Worked: {staff.daysWorked}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="h-4 w-4 text-gray-400" />
                  <span>Leave Days: {staff.leaveDays}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCreditCard className="h-4 w-4 text-gray-400" />
                  <span>Advance: {formatCurrency(staff.totalAdvance)}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Salary:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(staff.totalSalary)}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-gray-600">Balance:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(staff.balance)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Summary */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <FiBarChart className="text-gray-600" /> Final Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Financial Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Income:</span>
                <span className="font-medium text-green-600">{formatCurrency(finance.totalIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Expense:</span>
                <span className="font-medium text-red-600">{formatCurrency(finance.totalExpense)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium text-gray-700">Net Balance:</span>
                <span className={`font-bold ${finance.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(finance.balance)}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Staff Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Salary:</span>
                <span className="font-medium text-purple-600">{formatCurrency(staffTotals.totalSalary)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Advance:</span>
                <span className="font-medium text-orange-600">{formatCurrency(staffTotals.totalAdvance)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium text-gray-700">Staff Balance:</span>
                <span className="font-bold text-purple-600">{formatCurrency(staffTotals.balance)}</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Period Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium">{formatDate(period.start)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End Date:</span>
                <span className="font-medium">{formatDate(period.end)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium text-gray-700">Total Days:</span>
                <span className="font-bold text-blue-600">{period.totalDays || 0}</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ReportDisplay;