import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import RegiseterPage from '../pages/RegisterPage'
const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/register" element={<RegiseterPage/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes