import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './routes/Admin';
import Login from './pages/admin/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {Admin()}
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={() =>
          "relative flex items-start gap-3 bg-gray-900 text-white rounded-xl shadow-xl px-4 py-3 border-l-4 border-green-500"
        }
        bodyClassName="text-sm leading-relaxed"
        progressClassName="bg-green-400 h-1 rounded"
      />

    </Router>
  );
}

export default App;
