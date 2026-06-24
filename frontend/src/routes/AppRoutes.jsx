import "react-toastify/dist/ReactToastify.css";
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import RegiseterPage from '../pages/RegisterPage'
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/register" element={<RegiseterPage/>}/>
<Route
 path="/login"
 element={<LoginPage />}
/>
<Route
  path="/dashboard"
  element={<DashboardPage />}
/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default AppRoutes