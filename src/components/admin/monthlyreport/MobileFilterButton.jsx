import { FiFilter } from 'react-icons/fi';

const MobileFilterButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="sm:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors animate-bounce"
      aria-label="Open filters"
    >
      <FiFilter size={24} />
    </button>
  );
};

export default MobileFilterButton;