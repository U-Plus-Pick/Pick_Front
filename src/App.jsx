import React from 'react'
import HeroChatBot from './components/MainSection/HeroChatBot'
import HeroSection from './components/MainSection/HeroSection'
import HeroSlogun from './components/MainSection/HeroSlogun'
import HeroUPI from './components/MainSection/HeroUPI'

function App() {
  return (
    <div>
      <HeroSection />
      <HeroSlogun />
      <HeroUPI />
      <HeroChatBot />
    </div>
  )
}

export default App
