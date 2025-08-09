import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate()

  const onBack = () => {
    navigate('../')
  }
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm sm:text-base transition-colors"
        type="button"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Staff List
      </button>
    </div>
  )
}

export default BackButton
