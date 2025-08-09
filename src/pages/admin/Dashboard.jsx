import React from 'react';
import { FiActivity, FiUsers, FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { useFetchdashboardReport } from '../../hooks/report/Reporthooks';
import DashboardSkeleton from '../../skeletons/DashboardSkeleton';

function Dashboard() {
  const { report, loading, error } = useFetchdashboardReport();

  if (loading) return <DashboardSkeleton />;
  if (error) return <div className="text-red-600 p-4">Error: {error}</div>;

  if (!report) return <DashboardSkeleton />;

  const financialData = report.financialSummary;
  const staffData = report.staffSummary;
  const recentAdvances = report.recentActivity.recentAdvances;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Income Card */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Current Income</p>
              <p className="text-2xl font-semibold mt-1">{formatCurrency(financialData.currentIncome)}</p>
              <div className="flex items-center mt-2 text-sm">
                {financialData.incomeChange >= 0 ? (
                  <FiTrendingUp className="text-green-500 mr-1" />
                ) : (
                  <FiTrendingDown className="text-red-500 mr-1" />
                )}
                <span className={financialData.incomeChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(financialData.incomeChange)}%
                </span>
                <span className="text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <FiDollarSign size={20} />
            </div>
          </div>
        </div>

        {/* Expense Card */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Current Expense</p>
              <p className="text-2xl font-semibold mt-1">{formatCurrency(financialData.currentExpense)}</p>
              <div className="flex items-center mt-2 text-sm">
                {financialData.expenseChange >= 0 ? (
                  <FiTrendingUp className="text-green-500 mr-1" />
                ) : (
                  <FiTrendingDown className="text-red-500 mr-1" />
                )}
                <span className={financialData.expenseChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(financialData.expenseChange)}%
                </span>
                <span className="text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-red-50 text-red-600">
              <FiActivity size={20} />
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Current Balance</p>
              <p className={`text-2xl font-semibold mt-1 ${financialData.currentBalance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                {formatCurrency(financialData.currentBalance)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-600">
              <FiDollarSign size={20} />
            </div>
          </div>
        </div>

        {/* Staff Card */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Staff</p>
              <p className="text-2xl font-semibold mt-1">{staffData.totalStaff}</p>
              <div className="flex space-x-4 mt-2 text-sm">
                <span className="text-gray-600">{staffData.activeStaff} active</span>
                <span className="text-gray-600">{staffData.pendingLeaves} pending leaves</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-50 text-purple-600">
              <FiUsers size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Advances Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Advances</h2>
        <div className="space-y-4">
          {recentAdvances.map((advance) => (
            <div key={advance.id} className="flex items-start justify-between p-3 hover:bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gray-100 text-gray-600">
                  <FiUsers size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">{advance.staffName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(advance.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-red-600">
                  {formatCurrency(advance.amount)}
                </p>
                <p className="text-xs text-gray-500">Advance</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="text-sm text-gray-500 text-center mt-4">
        Showing data from {new Date(report.timePeriod.currentMonthStart).toLocaleDateString()} to{' '}
        {new Date(report.timePeriod.currentMonthEnd).toLocaleDateString()}
      </div>
    </div>
  );
}

export default Dashboard;