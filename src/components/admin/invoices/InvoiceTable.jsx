import React from 'react';
import {
    FiPlus,
    FiSearch,
    FiAlertCircle,
    FiFileText,
    FiUser,
    FiCalendar,
    FiDollarSign,
    FiEdit,
    FiTrash2,
    FiDownload
} from 'react-icons/fi';
import { handleDownload } from './HandleDownloadpdf';

const InvoiceTable = ({
    invoices,
    loading,
    error,
    searchTerm,
    onSearchChange,
    onEdit,
    onDelete,
    onNewInvoice,
    deleteLoading,
    page = 1,
    totalPages = 1,
    onPageChange = () => {}
}) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="p-8 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
                            <button
                                onClick={onNewInvoice}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <FiPlus size={20} />
                                New Invoice
                            </button>
                        </div>

                        <div className="mt-6 flex items-center gap-4">
                            <div className="relative flex-1 max-w-md">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search invoices..."
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mx-8 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                            <FiAlertCircle className="text-red-500" size={20} />
                            <span className="text-red-700">{error.message}</span>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Invoice
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Bill To
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Due Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {invoices.map((invoice) => (
                                        <tr key={invoice._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FiFileText className="text-gray-400 mr-3" size={16} />
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {invoice.invoiceNo}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FiUser className="text-gray-400 mr-3" size={16} />
                                                    <span className="text-sm text-gray-900">{invoice.billTo}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FiCalendar className="text-gray-400 mr-3" size={16} />
                                                    <span className="text-sm text-gray-900">
                                                        {new Date(invoice.invoiceDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FiCalendar className="text-gray-400 mr-3" size={16} />
                                                    <span className="text-sm text-gray-900">
                                                        {new Date(invoice.dueDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FiDollarSign className="text-gray-400 mr-3" size={16} />
                                                    <span className="text-sm font-medium text-gray-900">
                                                        ${invoice.subtotal.toFixed(2)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => onEdit(invoice)}
                                                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                                                    >
                                                        <FiEdit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete(invoice._id)}
                                                        disabled={deleteLoading}
                                                        className="text-red-600 hover:text-red-900 p-1 rounded transition-colors disabled:opacity-50"
                                                    >
                                                        <FiTrash2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDownload(invoice)}
                                                        className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                                                    >
                                                        <FiDownload size={16} />
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center space-x-1 my-6">
                                    <button
                                        onClick={() => onPageChange(page - 1)}
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
                                                onClick={() => onPageChange(pageNum)}
                                                className={`px-3 py-1 border rounded ${page === pageNum ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    <button
                                        onClick={() => onPageChange(page + 1)}
                                        disabled={page === totalPages}
                                        className="px-3 py-1 border rounded disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}

                            {invoices.length === 0 && (
                                <div className="text-center py-12">
                                    <FiFileText className="mx-auto text-gray-400 mb-4" size={48} />
                                    <p className="text-gray-500">No invoices found</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvoiceTable;
