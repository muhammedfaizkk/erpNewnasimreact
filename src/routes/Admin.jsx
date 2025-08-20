import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import Profile from '../pages/admin/Profile';
import Sites from '../pages/admin/Sites';
import Staffs from '../pages/admin/Staffas';
import Genaral from '../pages/admin/Genaral';
import SiteDetailView from '../components/admin/SiteDetailView';
import StaffDetail from '../pages/admin/StaffDetail';
import MonthlyReportPage from '../pages/admin/MonthlyReportPage';
import Quotations from '../pages/admin/Quotations';
import ProtectedRoute from "../Protected/ProtectedRoute";


const Admin = () => (
    <>
        <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="admin/profile" element={<Profile />} />
            <Route path="admin/quotation" element={<Quotations />} />
            <Route path="admin/sites" element={<Sites />} />
            <Route path="admin/staffs" element={<Staffs />} />
            <Route path="site/view/:id" element={<SiteDetailView />} />
            <Route path="admin/genaral" element={<Genaral />} />
            <Route path="sitedetailview/:siteId" element={<SiteDetailView />} />
            <Route path="staffdetail/:staffId" element={<StaffDetail />} />
            <Route path="admin/reports" element={<MonthlyReportPage />} />
        </Route>
    </>
);

export default Admin;
