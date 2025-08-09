import React from "react";
import { FiEdit, FiTrash2, FiDownload } from "react-icons/fi";
import { handleDownload } from "./HandleDownloadpdf";

const InvoiceCard = ({ invoice, onEdit, onDelete, deleteLoading }) => (
  <div className="bg-white rounded-lg shadow p-4 mb-4">
    <div className="flex justify-between items-center mb-2">
      <div className="font-bold text-lg">{invoice.invoiceNo}</div>
      <div className="flex space-x-2">
        <button onClick={() => onEdit(invoice)} className="text-blue-600">
          <FiEdit />
        </button>
        <button
          onClick={() => onDelete(invoice._id)}
          disabled={deleteLoading}
          className="text-red-600 disabled:opacity-50"
        >
          <FiTrash2 />
        </button>
        <button
          onClick={() => handleDownload(invoice)}
          className="text-green-600"
        >
          <FiDownload />
        </button>
      </div>
    </div>
    <div>
      <div>
        <span className="font-semibold">Bill To:</span> {invoice.billTo}
      </div>
      <div>
        <span className="font-semibold">Date:</span>{" "}
        {new Date(invoice.invoiceDate).toLocaleDateString()}
      </div>
      <div>
        <span className="font-semibold">Due:</span>{" "}
        {new Date(invoice.dueDate).toLocaleDateString()}
      </div>
      <div>
        <span className="font-semibold">Amount:</span> ₹
        {invoice.subtotal.toLocaleString()}
      </div>
    </div>
  </div>
);

export default InvoiceCard;