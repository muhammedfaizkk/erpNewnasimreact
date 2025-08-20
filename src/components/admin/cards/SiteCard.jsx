import React from 'react';
import { MapPin, Phone, Eye, Pencil, Trash2 } from 'lucide-react';

const SiteCard = ({
  site,
  onViewClick,
  onEditClick,
  onDeleteClick,
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusIcon,
  calculateBalance,
}) => {
  const balance = calculateBalance(site);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{site.name}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {site.place}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Phone className="w-4 h-4 mr-1 text-green-500" />
            {site.contactNumber}
          </div>
        </div>
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(site.status)}`}>
          {getStatusIcon(site.status)}
          <span className="ml-1">{site.status.toUpperCase()}</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <div className="text-gray-500">Start Date</div>
          <div>{formatDate(site.startDate)}</div>
        </div>
        <div>
          <div className="text-gray-500">Due Date</div>
          <div>{formatDate(site.dueDate)}</div>
        </div>
        <div>
          <div className="text-gray-500">Budget</div>
          <div className="text-blue-600">{formatCurrency(site.budget)}</div>
        </div>
        <div>
          <div className="text-gray-500">Balance</div>
          <div className={balance >= 0 ? 'text-green-600' : 'text-red-600'}>
            {formatCurrency(balance)}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewClick(site);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors flex items-center gap-1"
        >
          <Eye className="w-4 h-4" />
          View
        </button>

        <button
          onClick={() => onEditClick(site)}
          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors flex items-center gap-1"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDeleteClick(site)}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default SiteCard;