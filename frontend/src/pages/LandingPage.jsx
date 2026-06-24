import React from 'react'
import Navbar from '../components/common/Navbar'
import HeroSection from '../components/landing/HeroSection'
import StatsSection from '../components/landing/StatsSection'
import FeaturesSection from '../components/landing/FeaturesSection'

const LandingPage = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <StatsSection/>
    <FeaturesSection/>
    </>
  )
}

export default LandingPage