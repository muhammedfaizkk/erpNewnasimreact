// src/components/admin/tables/SiteTable.jsx
import React, { memo } from 'react';
import { MapPin, Phone, Eye, Pencil, Trash2 } from 'lucide-react';

const SiteTable = memo(({
  sites,
  onRowClick,
  onEdit,
  onDelete,
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusIcon,
  loading,
  calculateBalance,
  page,
  setPage,
  totalPages,
}) => {
  const handleActionClick = (e, action, site) => {
    e.stopPropagation();
    action(site);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Site Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeline
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Financials
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-500">Loading site data...</span>
                  </div>
                </td>
              </tr>
            ) : sites.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8">
                  <div className="text-gray-500">
                    <div className="text-lg mb-2">No sites found</div>
                    <div className="text-sm">Try adjusting your search or filter criteria</div>
                  </div>
                </td>
              </tr>
            ) : (
              sites.map((site) => {
                const balance = calculateBalance(site);
                const siteId = site.id || site._id;

                return (
                  <tr
                    key={siteId}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onRowClick(site)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {site.name || 'Unnamed Site'}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{site.place || 'No location'}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1 capitalize">
                          {site.type || 'Site'} - {site.work || 'No work specified'}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Phone className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                        <span className="truncate">{site.contactNumber || 'No contact'}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900">
                          Start: {formatDate(site.startDate)}
                        </div>
                        <div className="text-gray-500">
                          Due: {formatDate(site.dueDate)}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm space-y-1">
                        <div className="text-blue-600 font-medium">
                          Budget: {formatCurrency(site.budget)}
                        </div>
                        <div className="text-green-600">
                          Income: {formatCurrency(site.totalIncome)}
                        </div>
                        <div className="text-red-600">
                          Expense: {formatCurrency(site.totalExpense)}
                        </div>
                        <div className={`font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Balance: {formatCurrency(balance)}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(site.status)}`}>
                        {getStatusIcon(site.status)}
                        <span className="ml-1 capitalize">
                          {site.status?.toLowerCase() || 'unknown'}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleActionClick(e, onRowClick, site)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">View</span>
                        </button>

                        <button
                          onClick={(e) => handleActionClick(e, onEdit, site)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                          title="Edit Site"
                        >
                          <Pencil className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        <button
                          onClick={(e) => handleActionClick(e, onDelete, site)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                          title="Delete Site"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {/* <div className="flex justify-center items-center space-x-1 my-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-1 border rounded ${
                  page === pageNum ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
});

SiteTable.displayName = 'SiteTable';

export default SiteTable;