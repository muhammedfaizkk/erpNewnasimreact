
const StaffLeave = ({ staffId, leaves, onAddLeave }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLeave, setNewLeave] = useState({
    date: '',
    leaveType: '',
    leaveDuration: '',
    reason: ''
  });

  const staffLeaves = leaves.filter(leave => leave.staffId === staffId);

  const handleSubmit = () => {
    if (newLeave.date && newLeave.leaveType && newLeave.leaveDuration && newLeave.reason) {
      onAddLeave({
        ...newLeave,
        staffId,
        id: Date.now(),
        status: 'Pending'
      });
      setNewLeave({ date: '', leaveType: '', leaveDuration: '', reason: '' });
      setShowAddForm(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Leave Records</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Leave
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
                value={newLeave.date}
                onChange={(e) => setNewLeave({...newLeave, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
              <select
                value={newLeave.leaveType}
                onChange={(e) => setNewLeave({...newLeave, leaveType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Vacation">Vacation</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Emergency Leave">Emergency Leave</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                placeholder="e.g., 1 Day, 3 Days"
                value={newLeave.leaveDuration}
                onChange={(e) => setNewLeave({...newLeave, leaveDuration: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
              <input
                type="text"
                placeholder="Reason for leave"
                value={newLeave.reason}
                onChange={(e) => setNewLeave({...newLeave, reason: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Leave
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staffLeaves.map((leave) => (
              <tr key={leave.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(leave.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.leaveType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                    {leave.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.leaveDuration}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{leave.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {staffLeaves.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No leave records found
          </div>
        )}
      </div>
    </div>
  );
};