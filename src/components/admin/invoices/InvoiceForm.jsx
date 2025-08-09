import { useState } from "react";
import { FiX as X, FiPlus as Plus, FiAlertCircle as AlertCircle, FiTrash2 as Trash2, FiSave as Save } from 'react-icons/fi';



const InvoiceForm = ({ 
    invoice, 
    onSubmit, 
    onCancel, 
    loading, 
    error 
  }) => {
    const [formData, setFormData] = useState({
      invoiceNo: invoice?.invoiceNo || '',
      invoiceDate: invoice?.invoiceDate?.split('T')[0] || '',
      dueDate: invoice?.dueDate?.split('T')[0] || '',
      billTo: invoice?.billTo || '',
      items: invoice?.items || [{ description: '', quantity: '', rate: '', amount: '' }]
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleItemChange = (index, field, value) => {
      const newItems = [...formData.items];
      newItems[index][field] = value;
      
      if (field === 'rate' || field === 'quantity') {
        const rate = parseFloat(newItems[index].rate) || 0;
        const quantity = parseFloat(newItems[index].quantity) || 0;
        newItems[index].amount = rate * quantity;
      }
      
      setFormData(prev => ({
        ...prev,
        items: newItems
      }));
    };
  
    const addItem = () => {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, { description: '', quantity: '', rate: '', amount: '' }]
      }));
    };
  
    const removeItem = (index) => {
      if (formData.items.length > 1) {
        setFormData(prev => ({
          ...prev,
          items: prev.items.filter((_, i) => i !== index)
        }));
      }
    };
  
    const handleSubmit = () => {
      const invoiceData = {
        ...formData,
        items: formData.items.map(item => ({
          ...item,
          rate: parseFloat(item.rate) || 0,
          amount: parseFloat(item.amount) || 0
        }))
      };
      onSubmit(invoiceData);
    };
  
    const subtotal = formData.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {invoice ? 'Edit Invoice' : 'New Invoice'}
              </h1>
              <button
                onClick={onCancel}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
  
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="text-red-500" size={20} />
                <span className="text-red-700">{error.message}</span>
              </div>
            )}
  
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bill To
                  </label>
                  <input
                    type="text"
                    name="billTo"
                    value={formData.billTo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Date
                  </label>
                  <input
                    type="date"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Items</h3>
                  <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={16} />
                    Add Item
                  </button>
                </div>
  
                <div className="space-y-4">
                  {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
  
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity
                        </label>
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
  
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rate
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
  
                      <div className="flex items-end">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={item.amount}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>
                        {formData.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="ml-2 p-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
  
                <div className="flex justify-end mt-6 p-4 bg-gray-100 rounded-lg">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      Subtotal: ${subtotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
  
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      {invoice ? 'Update Invoice' : 'Create Invoice'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default InvoiceForm;