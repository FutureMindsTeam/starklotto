import React from 'react';
import { useNavigate } from 'react-router-dom';

const DrawsCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
      <div className="text-blue-500 text-4xl">
        {/* Replace with an actual icon */}
        🏆
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">Sorteos</h3>
        <p className="text-sm text-gray-600">Manage draws and results efficiently.</p>
      </div>
      <button
        onClick={() => navigate('/sorteos')}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Go to Sorteos
      </button>
    </div>
  );
};

export default DrawsCard;
