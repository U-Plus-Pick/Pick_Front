import React, { useEffect, useRef } from 'react'
import css from '../../styles/scss/HeroBundle.module.scss'
import HeroBundle1 from '../../assets/HeroBundle1.png'
import HeroBundle2 from '../../assets/HeroBundle2.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroBundle = () => {
  const sectionRef = useRef(null)
  const mockupRef = useRef(null)
  const cardRef = useRef(null)
  const descRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: false,
          pin: true,
        },
      })

      tl.from(mockupRef.current, {
        x: -200,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
        .from(
          cardRef.current,
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '+=0.2'
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
          },
          '+=0.2'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={css.bundleSection} ref={sectionRef}>
      <div className={css.imageGroup}>
        <div className={css.left}>
          <img src={HeroBundle1} alt="결합 소개 목업" className={css.mockupImage} ref={mockupRef} />
        </div>

        <div className={css.right}>
          <img
            src={HeroBundle2}
            alt="결합 유형 선택 안내"
            className={css.cardImage}
            ref={cardRef}
          />
          <div className={css.desc} ref={descRef}>
            <div>
              <div className={css.HeroBundleTitle}>
                <span className={css.highlight1}>혼자</span>여도 괜찮습니다.
              </div>
              <div className={css.space1}></div>
              <span className={css.highlight}>혼자라면</span>
              <br />
              할인은 포기해야 할까요?
              <br />
              <div className={css.space2}></div>
              <span className={css.highlight1}>U+Pick</span>에서 함께 할인받을
              <br />
              <span className={css.highlight2}>새로운 연결</span>을 만들어드립니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBundle
