import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Phone,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Building2,
  Circle,
  CheckCircle2,
  XCircle,
  Filter,
  X
} from 'lucide-react';

import ExpenseTable from '../../components/admin/tables/ExpenseTable';
import IncomeTable from '../../components/admin/tables/IncomeTable';
import SiteAttendanceTable from '../../components/admin/tables/Siteattendancetable';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSiteOverview } from '../../hooks/site/Sitehooks';

export default function SiteDetailView() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: ''
  });
  const [localStartDate, setLocalStartDate] = useState('');
  const [localEndDate, setLocalEndDate] = useState('');
  const { overview, loading, error, getSiteOverview } = useGetSiteOverview();
  const onBack = () => {
    navigate('../admin/sites')
  }
  useEffect(() => {
    if (siteId) {
      getSiteOverview(siteId, filters.startDate, filters.endDate);
    }
  }, [siteId, filters, getSiteOverview, refreshKey]);

  const handleDataChange = () => setRefreshKey(prev => prev + 1);

  const handleLocalStartDateChange = (e) => setLocalStartDate(e.target.value);
  const handleLocalEndDateChange = (e) => setLocalEndDate(e.target.value);

  const applyFilters = () => {
    setFilters({
      startDate: localStartDate,
      endDate: localEndDate
    });
  };

  const clearFilters = () => {
    setLocalStartDate('');
    setLocalEndDate('');
    setFilters({
      startDate: '',
      endDate: ''
    });
  };

  const hasActiveFilters = () => {
    return filters.startDate || filters.endDate;
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount || 0);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <Circle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const site = overview?.data?.siteInfo || overview?.site || overview;
  const totals = overview?.data?.totals || {};
  const balance = totals?.balance || ((site?.totalIncome || 0) - (site?.totalExpense || 0));

  useEffect(() => {
    setLocalStartDate(filters.startDate || '');
    setLocalEndDate(filters.endDate || '');
  }, [filters.startDate, filters.endDate]);

  if (loading) return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    </div>
  );
  if (error) return <div className="p-4 sm:p-6 text-center text-red-500">Error: {error.message}</div>;
  if (!site) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section - Improved for mobile */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-3 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Back to Sites
          </button>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-normal">
            <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(site.status)}`}>
              {getStatusIcon(site.status)}
              {site.status?.toUpperCase()}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors ${hasActiveFilters()
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Filters
              {hasActiveFilters() && (
                <span className="ml-1 bg-blue-600 text-white text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded-full">
                  {Object.values(filters).filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel - Improved for mobile */}
        {showFilters && (
          <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={localStartDate}
                  onChange={handleLocalStartDateChange}
                  className="w-full border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={localEndDate}
                  onChange={handleLocalEndDateChange}
                  className="w-full border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 sm:mt-4 gap-2 sm:gap-0">
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={applyFilters}
                  className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-blue-700 text-xs sm:text-sm font-medium flex-1 sm:flex-none text-center"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="bg-gray-200 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-gray-300 text-xs sm:text-sm font-medium flex-1 sm:flex-none text-center"
                >
                  Clear All
                </button>
              </div>
              {hasActiveFilters() && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 w-full sm:w-auto">
                  <span className="whitespace-nowrap">Active filters:</span>
                  <div className="flex flex-wrap gap-1 max-w-full overflow-hidden">
                    {filters.startDate && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] sm:text-xs bg-blue-100 text-blue-800">
                        Start: {formatDate(filters.startDate)}
                        <button
                          onClick={() => handleLocalStartDateChange({ target: { value: '' } })}
                          className="ml-1 hover:text-blue-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.endDate && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] sm:text-xs bg-blue-100 text-blue-800">
                        End: {formatDate(filters.endDate)}
                        <button
                          onClick={() => handleLocalEndDateChange({ target: { value: '' } })}
                          className="ml-1 hover:text-blue-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-2 sm:p-4">
        {/* Site Info Card - Improved for mobile */}
        <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{site.name}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-500" />
                <span className="text-sm sm:text-base">{site.place}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-500" />
                <span className="text-sm sm:text-base">{site.contactNumber}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-purple-500" />
                <span className="text-sm sm:text-base capitalize">{site.type || 'N/A'} - {site.work}</span>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-500" />
                <span className="text-sm sm:text-base">Start: {formatDate(site.startDate)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-500" />
                <span className="text-sm sm:text-base">Due: {formatDate(site.dueDate)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-500" />
                <span className="text-sm sm:text-base">Budget: {formatCurrency(site.budget)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-blue-50 rounded-lg p-2 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{formatCurrency(site.budget)}</div>
              <div className="text-xs sm:text-sm text-blue-500">Total Budget</div>
            </div>
            <div className="bg-green-50 rounded-lg p-2 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-green-600">{formatCurrency(totals.totalIncome || site.totalIncome || 0)}</div>
              <div className="text-xs sm:text-sm text-green-500">Total Income</div>
            </div>
            <div className="bg-red-50 rounded-lg p-2 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-red-600">{formatCurrency(totals.totalExpense || site.totalExpense || 0)}</div>
              <div className="text-xs sm:text-sm text-red-500">Total Expense</div>
            </div>
            <div className={`${balance >= 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg p-2 sm:p-4 text-center`}>
              <div className={`text-lg sm:text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(balance)}
              </div>
              <div className={`text-xs sm:text-sm ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                Balance
              </div>
            </div>
          </div>
        </div>

        {/* Tab Section - Improved for mobile */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex w-max min-w-full">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 min-w-max ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('income')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 min-w-max ${activeTab === 'income' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                Income
              </button>
              <button
                onClick={() => setActiveTab('expense')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 min-w-max ${activeTab === 'expense' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                Expenses
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 min-w-max ${activeTab === 'attendance' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                Site Attendance
              </button>
            </div>
          </div>

          <div className="p-3 sm:p-6">
            {activeTab === 'income' && (
              <IncomeTable
                key={`income-${refreshKey}`}
                onDataChange={handleDataChange}
                data={overview?.data?.incomeData || overview?.incomeData || []}
                siteId={siteId}
              />
            )}

            {activeTab === 'expense' && (
              <ExpenseTable
                key={`expense-${refreshKey}`}
                onDataChange={handleDataChange}
                data={overview?.data?.expenseData || overview?.expenseData || []}
                siteId={siteId}
              />
            )}
            {activeTab === 'attendance' && (
              <SiteAttendanceTable
                key={`expense-${refreshKey}`}
                onDataChange={handleDataChange}
                data={overview?.data?.expenseData || overview?.expenseData || []}
                siteId={siteId}
              />
            )}

            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-3 sm:mb-4 flex items-center">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Income Summary
                    </h3>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-green-700">Current Month:</span>
                        <span className="font-semibold text-green-800">{formatCurrency(totals.monthlyIncome || site.currentMonthIncome || 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-green-700">Total Income:</span>
                        <span className="font-bold text-green-800 text-base sm:text-lg">{formatCurrency(totals.totalIncome || site.totalIncome || 0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-red-800 mb-3 sm:mb-4 flex items-center">
                      <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Expense Summary
                    </h3>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-red-700">Current Month:</span>
                        <span className="font-semibold text-red-800">{formatCurrency(totals.monthlyExpense || site.currentMonthExpense || 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-red-700">Total Expense:</span>
                        <span className="font-bold text-red-800 text-base sm:text-lg">{formatCurrency(totals.totalExpense || site.totalExpense || 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-3 sm:mb-4 flex items-center">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Financial Health
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-blue-600">{formatCurrency(site.budget)}</div>
                      <div className="text-xs sm:text-sm text-blue-500">Budget</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg sm:text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(balance)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">Current Balance</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg sm:text-2xl font-bold ${(totals.totalExpense || site.totalExpense || 0) <= site.budget ? 'text-green-600' : 'text-red-600'}`}>
                        {totals.budgetUsedPercentage || (((totals.totalExpense || site.totalExpense || 0) / site.budget) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">Budget Used</div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-gray-500 mt-6 sm:mt-8">
                  <Building2 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-lg">Use the Income and Expenses tabs to manage financial transactions</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}