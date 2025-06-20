import React, { useEffect } from 'react'
import { useScrollDirection } from 'react-use-scroll-direction'

import HeroChatBot from '../components/MainSection/HeroChatBot'
import HeroSection from '../components/MainSection/HeroSection'
import HeroSlogun from '../components/MainSection/HeroSlogun'
import HeroUPI from '../components/MainSection/HeroUPI'
import HeroBundle from '../components/MainSection/HeroBundle'
import HeroMap from '../components/MainSection/HeroMembershipMap'
import HeroRelation from '../components/MainSection/HeroRelation'
import HeroLastPage from '../components/MainSection/HeroLastPage'

function MainPage() {
  const { isScrollingUp, isScrollingDown } = useScrollDirection()

  useEffect(() => {
    const header = document.querySelector('.header')
    if (!header) return

    if (isScrollingDown) {
      header.classList.add('hide-header')
      header.classList.remove('show-header')
    } else if (isScrollingUp) {
      header.classList.add('show-header')
      header.classList.remove('hide-header')
    }
  }, [isScrollingUp, isScrollingDown])

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
