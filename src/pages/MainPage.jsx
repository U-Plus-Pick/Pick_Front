import React from 'react'
import HeroChatBot from '../components/MainSection/HeroChatBot'
import HeroSection from '../components/MainSection/HeroSection'
import HeroSlogun from '../components/MainSection/HeroSlogun'
import HeroUPI from '../components/MainSection/HeroUPI'
import HeroBundle from '../components/MainSection/HeroBundle'
import HeroMap from '../components/MainSection/HeroMembershipMap'
import HeroRelation from '../components/MainSection/HeroRelation'
import HeroLastPage from '../components/MainSection/HeroLastPage'

function MainPage() {
  return (
    <div>
      <HeroSection />
      <HeroSlogun />
      <HeroUPI />
      <HeroChatBot />
      <HeroBundle />
      <HeroMap />
      <HeroRelation />
      <HeroLastPage />
    </div>
  )
}

export default MainPage
