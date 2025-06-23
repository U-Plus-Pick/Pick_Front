import React, { useEffect, useRef } from 'react'
import css from '../../styles/scss/HeroUPI.module.scss'
import HeroWalkingUPI from '../../assets/HeroWalkingUPI2.webm'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroUPI = () => {
  const sectionRef = useRef(null)
  const leftTextRef = useRef(null)
  const rightTextRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: false,
        },
      })

      tl.from(leftTextRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      }).from(
        rightTextRef.current,
        {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        '+=0.2'
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className={css.heroUPI} ref={sectionRef}>
      <div className={css.leftText} ref={leftTextRef}>
        복잡한 통신 속,
        <br />
        당신을 가장 먼저
        <br />
        <span className={css.highlight1}>이해하는</span> 존재
      </div>

      <video autoPlay muted loop playsInline className={css.upi}>
        <source src={HeroWalkingUPI} type="video/webm" />
        브라우저가 video 태그를 지원하지 않습니다.
      </video>

      <div className={css.rightText} ref={rightTextRef}>
        <p>
          <span className={css.highlight2}>U+</span>
          <br />
          <span className={css.highlight2}>P</span>ersonal
          <br />
          <span className={css.highlight2}>I</span>ntelligence
          <br />
          <span className={css.highlight2}>유피</span>가 함께합니다.
        </p>
      </div>
    </section>
  )
}

export default HeroUPI
