import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiUsers, 
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiClock,
  FiHome,
  FiFileText,
  FiCreditCard,
  FiMapPin,
  FiTag,
  FiCreditCard as FiPayment,
  FiBarChart
} from 'react-icons/fi';

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
        <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
        <p className="text-gray-600 mt-2">No report data available</p>
      </div>
    );
  }

  const { period, finance, staffReports, staffTotals } = report;

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  return (
    <div className="space-y-6">
      {/* Period Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <FiCalendar className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Report Period</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Start Date</p>
            <p className="font-medium">{formatDate(period.start)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">End Date</p>
            <p className="font-medium">{formatDate(period.end)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Days</p>
            <p className="font-medium">{period.totalDays}</p>
          </div>
        </div>
      </div>

      {/* Finance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <FiTrendingUp className="text-green-600" />
            <h4 className="font-medium text-green-800">Total Income</h4>
          </div>
          <p className="text-2xl font-bold text-green-700">₹{finance.totalIncome.toLocaleString()}</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <FiTrendingDown className="text-red-600" />
            <h4 className="font-medium text-red-800">Total Expense</h4>
          </div>
          <p className="text-2xl font-bold text-red-700">₹{finance.totalExpense.toLocaleString()}</p>
        </div>
        
        <div className={`p-4 rounded-lg border ${finance.balance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <FiDollarSign className={finance.balance >= 0 ? "text-blue-600" : "text-red-600"} />
            <h4 className={`font-medium ${finance.balance >= 0 ? 'text-blue-800' : 'text-red-800'}`}>Balance</h4>
          </div>
          <p className={`text-2xl font-bold ${finance.balance >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
            ₹{finance.balance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Staff Summary */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <FiUsers className="text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Staff Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Salary</p>
            <p className="text-xl font-bold text-purple-700">₹{staffTotals.totalSalary.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Advance</p>
            <p className="text-xl font-bold text-purple-700">₹{staffTotals.totalAdvance.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Balance</p>
            <p className="text-xl font-bold text-purple-700">₹{staffTotals.balance.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Staff Details - Desktop Table */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Staff Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Wage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Worked</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staffReports.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FiUser className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiBriefcase className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{staff.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{staff.dailyWage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.daysWorked}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.leaveDays}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{staff.totalAdvance}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{staff.totalSalary}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹{staff.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Staff Details - Mobile Cards */}
      <div className="md:hidden">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Staff Details</h3>
        <div className="space-y-4">
          {staffReports.map((staff) => (
            <div key={staff.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUser className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{staff.name}</h4>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <FiBriefcase className="h-3 w-3" />
                    <span>{staff.role}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <FiDollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Daily Wage:</span>
                  <span className="font-medium">₹{staff.dailyWage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Days Worked:</span>
                  <span className="font-medium">{staff.daysWorked}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiHome className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Leave Days:</span>
                  <span className="font-medium">{staff.leaveDays}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCreditCard className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Advance:</span>
                  <span className="font-medium">₹{staff.totalAdvance}</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Salary:</span>
                  <span className="font-semibold text-gray-900">₹{staff.totalSalary}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">Balance:</span>
                  <span className="font-semibold text-green-600">₹{staff.balance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Totals Summary */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <FiBarChart className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Final Summary</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Financial Totals */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Financial Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Income:</span>
                <span className="text-sm font-medium text-green-600">₹{finance.totalIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Expense:</span>
                <span className="text-sm font-medium text-red-600">₹{finance.totalExpense.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm font-medium text-gray-700">Net Balance:</span>
                <span className={`text-sm font-bold ${finance.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{finance.balance.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Staff Totals */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Staff Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Salary:</span>
                <span className="text-sm font-medium text-purple-600">₹{staffTotals.totalSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Advance:</span>
                <span className="text-sm font-medium text-orange-600">₹{staffTotals.totalAdvance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm font-medium text-gray-700">Staff Balance:</span>
                <span className="text-sm font-bold text-purple-600">₹{staffTotals.balance.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Period Summary */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Period Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Start Date:</span>
                <span className="text-sm font-medium">{formatDate(period.start)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">End Date:</span>
                <span className="text-sm font-medium">{formatDate(period.end)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm font-medium text-gray-700">Total Days:</span>
                <span className="text-sm font-bold text-blue-600">{period.totalDays}</span>
              </div>
            </div>
          </div>

          {/* Overall Summary */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Overall Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Staff:</span>
                <span className="text-sm font-medium text-blue-600">{staffReports.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Daily Wage:</span>
                <span className="text-sm font-medium text-indigo-600">
                  ₹{(staffReports.reduce((sum, staff) => sum + staff.dailyWage, 0) / staffReports.length).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm font-medium text-gray-700">Total Days Worked:</span>
                <span className="text-sm font-bold text-indigo-600">
                  {staffReports.reduce((sum, staff) => sum + staff.daysWorked, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDisplay; 