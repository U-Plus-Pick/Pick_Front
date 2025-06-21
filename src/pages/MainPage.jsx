import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import HeroChatBot from '../components/MainSection/HeroChatBot'
import HeroSection from '../components/MainSection/HeroSection'
import HeroSlogun from '../components/MainSection/HeroSlogun'
import HeroUPI from '../components/MainSection/HeroUPI'
import HeroBundle from '../components/MainSection/HeroBundle'
import HeroMap from '../components/MainSection/HeroMembershipMap'
import HeroRelation from '../components/MainSection/HeroRelation'
import HeroLastPage from '../components/MainSection/HeroLastPage'

function MainPage() {
  const location = useLocation()
  const prevScroll = useRef(0)

  useEffect(() => {
    const header = document.querySelector('.header')
    if (!header || location.pathname !== '/') return

    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll > prevScroll.current) {
        // 내려갔을 때
        header.classList.add('hide-header')
        header.classList.remove('show-header')
      } else if (currentScroll < prevScroll.current) {
        // 올라갔을 때
        header.classList.add('show-header')
        header.classList.remove('hide-header')
      }

      prevScroll.current = currentScroll
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      header.classList.remove('hide-header')
      header.classList.add('show-header')
    }
  }, [location.pathname])

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
