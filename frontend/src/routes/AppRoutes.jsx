import "react-toastify/dist/ReactToastify.css";
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import RegiseterPage from '../pages/RegisterPage'
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ActivitiesPage from "../pages/ActivitiesPage";
import RecommendationsPage from "../pages/RecommendationsPage";
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
<Route
  path="/activities"
  element={<ActivitiesPage />}
/>
<Route
  path="/recommendations"
  element={<RecommendationsPage />}
/>

    </Routes>
    </BrowserRouter>
    
  )
}

export default AppRoutes