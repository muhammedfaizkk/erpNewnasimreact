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
  XCircle
} from 'lucide-react';

import ExpenseTable from '../../components/admin/tables/ExpenseTable';
import IncomeTable from '../../components/admin/tables/IncomeTable';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSiteById } from '../../hooks/site/Sitehooks';

export default function SiteDetailView({ onBack }) {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const { site, loading, error, getSiteById } = useGetSiteById();

  useEffect(() => {
    if (siteId) {
      getSiteById(siteId);
    }
  }, [siteId, getSiteById]);

  const handleDataChange = () => setRefreshKey(prev => prev + 1);

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

  const balance = (site?.totalIncome || 0) - (site?.totalExpense || 0);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading site details...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error.message}</div>;
  if (!site) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Sites
          </button>
          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(site.status)}`}>
            {getStatusIcon(site.status)}
            {site.status?.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{site.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                <span>{site.place}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3 text-green-500" />
                <span>{site.contactNumber}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Building2 className="w-5 h-5 mr-3 text-purple-500" />
                <span className="capitalize">{site.type} - {site.work}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                <span>Start: {formatDate(site.startDate)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3 text-red-500" />
                <span>Due: {formatDate(site.dueDate)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-5 h-5 mr-3 text-green-500" />
                <span>Budget: {formatCurrency(site.budget)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(site.budget)}</div>
              <div className="text-sm text-blue-500">Total Budget</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(site.totalIncome || 0)}</div>
              <div className="text-sm text-green-500">Total Income</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{formatCurrency(site.totalExpense || 0)}</div>
              <div className="text-sm text-red-500">Total Expense</div>
            </div>
            <div className={`${balance >= 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg p-4 text-center`}>
              <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(balance)}
              </div>
              <div className={`text-sm ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                Balance
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('income')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'income' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Income
              </button>
              <button
                onClick={() => setActiveTab('expense')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'expense' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Expenses
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'income' && (
              <IncomeTable
                key={`income-${refreshKey}`}
                siteId={site._id}
                onDataChange={handleDataChange}
              />
            )}

            {activeTab === 'expense' && (
              <ExpenseTable
                key={`expense-${refreshKey}`}
                siteId={site._id}
                onDataChange={handleDataChange}
              />
            )}

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Income Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-700">Current Month:</span>
                        <span className="font-semibold text-green-800">{formatCurrency(site.currentMonthIncome || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Total Income:</span>
                        <span className="font-bold text-green-800 text-lg">{formatCurrency(site.totalIncome || 0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                      <TrendingDown className="w-5 h-5 mr-2" />
                      Expense Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-red-700">Current Month:</span>
                        <span className="font-semibold text-red-800">{formatCurrency(site.currentMonthExpense || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-700">Total Expense:</span>
                        <span className="font-bold text-red-800 text-lg">{formatCurrency(site.totalExpense || 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Financial Health
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{formatCurrency(site.budget)}</div>
                      <div className="text-sm text-blue-500">Budget</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(balance)}
                      </div>
                      <div className="text-sm text-gray-500">Current Balance</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${site.totalExpense <= site.budget ? 'text-green-600' : 'text-red-600'}`}>
                        {((site.totalExpense / site.budget) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-500">Budget Used</div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-gray-500 mt-8">
                  <Building2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-lg">Use the Income and Expenses tabs to manage financial transactions</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
