const StaffAdvancePayment = ({ staffId, advancePayments, onAddAdvancePayment }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPayment, setNewPayment] = useState({
    date: '',
    amount: ''
  });

  const staffPayments = advancePayments.filter(payment => payment.staffId === staffId);

  const handleSubmit = () => {
    if (newPayment.date && newPayment.amount) {
      onAddAdvancePayment({
        ...newPayment,
        staffId,
        id: Date.now()
      });
      setNewPayment({ date: '', amount: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Advance Payments</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Payment
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={newPayment.date}
                onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="text"
                placeholder="e.g., $500"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Payment
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staffPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {payment.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {staffPayments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No advance payment records found
          </div>
        )}
      </div>
    </div>
  );
};
