import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./routes/Admin";
import Login from "./pages/admin/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SplashScreen from "./components/common/SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 sec splash
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

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
