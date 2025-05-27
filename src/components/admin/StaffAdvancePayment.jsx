import React from 'react'

export default function StaffAdvancePayment({ staffId, advancePayments, onAddAdvancePayment, dateFilter }) {

    const filteredPayments = dateFilter
        ? advancePayments.filter(payment => {
            const paymentDate = new Date(payment.date);
            return paymentDate >= new Date(dateFilter.startDate) &&
                paymentDate <= new Date(dateFilter.endDate);
        })
        : advancePayments;

    return (
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Advance Payments</h3>
                <button
                    onClick={() => onAddAdvancePayment()}
                    className="bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                    + Add Payment
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map(payment => (
                            <tr key={payment.id} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3 whitespace-nowrap text-sm">{new Date(payment.date).toLocaleDateString()}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600">{payment.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredPayments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No payments found</div>
                )}
            </div>
        </div>
    );
};
