import "react-toastify/dist/ReactToastify.css";
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import RegiseterPage from '../pages/RegisterPage'
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import GoalsPage from "../pages/GoalsPage";
import ActivitiesPage from "../pages/ActivitiesPage";
import RecommendationsPage from "../pages/RecommendationsPage";
import ProfilePage from "../pages/ProfilePage";
import ProfileSetupPage from "../pages/ProfileSetupPage";
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
<Route
  path="/profile"
  element={<ProfilePage />}
/>
<Route
  path="/goals"
  element={<GoalsPage />}
/>
<Route
  path="/profile/setup"
  element={<ProfileSetupPage />}
/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default AppRoutes