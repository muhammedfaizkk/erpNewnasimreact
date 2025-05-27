import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import Profile from '../pages/admin/Profile';
import Sites from '../pages/admin/Sites';
import Staffs from '../pages/admin/Staffas';
import Genaral from '../pages/admin/Genaral';
import StaffInnerpage from '../pages/admin/StaffInnerpage';
import Sitedetailpage from '../pages/Sitedetailpage';
import Report from '../pages/admin/Report';
import SiteDetailView from '../components/admin/SiteDetailView';


const Admin = () => (
    <>

        <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="admin/profile" element={<Profile />} />
            <Route path="admin/sites" element={<Sites />} />
            <Route path="admin/staffs" element={<Staffs />} />
            <Route path="site/view/:id" element={<SiteDetailView />} />
            <Route path="admin/genaral" element={<Genaral />} />
            <Route path="admin/report" element={<Report />} />
            <Route path="admin/staff/details/:staffId" element={<StaffInnerpage />} />
            <Route path="admin/site/details/:siteId" element={<Sitedetailpage />} />
           <Route path="sitedetailview/:siteId" element={<SiteDetailView/>} /> 
            

        </Route>
    </>
);

export default Admin;
