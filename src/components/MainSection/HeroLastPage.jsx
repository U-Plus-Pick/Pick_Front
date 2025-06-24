import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import css from '../../styles/scss/HeroLastPage.module.scss'
import HeroLast from '../../assets/Hero/HeroLast.png'
import { FiArrowUpRight } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrollRefresh from '../../hooks/useScrollRefresh'

gsap.registerPlugin(ScrollTrigger)

const HeroLastPage = () => {
  useScrollRefresh()
  const navigate = useNavigate()

  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, cardRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero-lastpage" className={css.heroLast}>
      <div className={css.card} ref={cardRef}>
        <img src={HeroLast} alt="HeroLast" className={css.HeroLast} />
        <p className={css.subText}>가입 후 즉시 사용 가능합니다.</p>
        <h2 className={css.title}>
          <span className={css.highlight1}>U+Pick</span>
          <span>을 시작할 준비가 되셨나요?</span>
        </h2>
        <div className={css.buttonGroup}>
          <button className={css.loginBtn} onClick={() => navigate('/login')}>
            로그인 하러 가기
            <div className={css.iconWrapper1}>
              <FiArrowUpRight />
            </div>
          </button>
          <button className={css.consultBtn} onClick={() => navigate('/chatbot')}>
            요금제 상담하기
            <div className={css.iconWrapper2}>
              <FiArrowUpRight />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroLastPage
