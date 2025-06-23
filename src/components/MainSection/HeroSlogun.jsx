import React, { useEffect, useRef } from 'react'
import css from '../../styles/scss/HeroSlogun.module.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroSlogun = () => {
  const sectionRef = useRef(null)
  const centerCircleRef = useRef(null)
  const leftTextRef = useRef(null)
  const rightTextRef = useRef(null)
  const ringsRef = useRef([])

  useEffect(() => {
    const validRings = ringsRef.current.filter(Boolean)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=600%',
          pin: true,
          scrub: false,
        },
      })

      //가운데 원 등장
      tl.from(centerCircleRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.out',
      })

      //ring 퍼짐 시작
      tl.add(() => {
        const waveTL = gsap.timeline({ repeat: -1 })
        validRings.forEach((ring, i) => {
          waveTL.fromTo(
            ring,
            {
              scale: 0.5,
              opacity: 0,
            },
            {
              scale: 1.1 + i * 0.05,
              opacity: 0.8,
              duration: 2.5,
              ease: 'power2.out',
            },
            i * 0.2 //ring 간 간격
          )
        })
      }, '+=0.1')

      //왼쪽 텍스트 (ring 퍼진 후 등장)
      tl.from(
        leftTextRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '+=1.2' // ring 시작 후 1.2초 뒤
      )

      //오른쪽 텍스트
      tl.from(
        rightTextRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '+=0.4'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={css.heroSlogun} ref={sectionRef}>
      <div className={css.textLeft} ref={leftTextRef}>
        당신의 <span>U+</span>
      </div>

      <div className={css.centerCircle} ref={centerCircleRef}>
        U⁺Pick
      </div>

      <div className={css.textRight} ref={rightTextRef}>
        당신만의 <span>AI</span>
      </div>

      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          ref={el => (ringsRef.current[i] = el)}
          className={`${css.ring} ${css[`ring${i + 1}`]}`}
        />
      ))}
    </section>
  )
}

export default HeroSlogun
