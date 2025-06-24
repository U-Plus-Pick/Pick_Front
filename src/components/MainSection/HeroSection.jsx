import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import css from '../../styles/scss/HeroSection.module.scss'
import CardItem from './HeroSectionCard'
import HeroImage1 from '../../assets/Hero/HeroIamge1.png'
import HeroImage2 from '../../assets/Hero/HeroIamge2.png'
import HeroImage3 from '../../assets/Hero/HeroIamge3.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrollRefresh from '../../hooks/useScrollRefresh'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  useScrollRefresh()
  const navigate = useNavigate()

  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const buttonGroupRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)

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

      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      })
        .from(
          buttonGroupRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
          },
          '+=0.2'
        )
        .from(
          [card1Ref.current, card2Ref.current, card3Ref.current],
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power2.out',
          },
          '+=0.2'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero-section" className={css.hero} ref={sectionRef}>
      <div className={css.content}>
        <h2 className={css.title} ref={titleRef}>
          스마트한 통신 생활
          <br />
          <span>U+Pick</span>에서 지금 시작하세요
        </h2>

        <div className={css.buttonGroup} ref={buttonGroupRef}>
          <button className={css.loginBtn} onClick={() => navigate('/login')}>
            로그인 하러 가기
          </button>
          <button className={css.planBtn} onClick={() => navigate('/chatbot')}>
            요금제 상담하기
          </button>
        </div>

        <div className={css.cardList}>
          <div ref={card1Ref}>
            <CardItem
              className={css.card1}
              img={HeroImage1}
              title="요금제 추천 ChatBot"
              desc={
                <>
                  ChatBot으로 <br /> <span className={css.highlight1}>U+Pick</span>에서 <br />{' '}
                  요금제 <span className={css.highlight2}>상담</span>을 받아보세요
                </>
              }
              link="/chatbot"
            />
          </div>
          <div ref={card2Ref}>
            <CardItem
              className={css.card2}
              imgClassName={css.card2Img}
              img={HeroImage2}
              title="결합 혜택 매칭 시스템"
              desc={
                <>
                  {' '}
                  <span className={css.highlight2}>혼자여도</span> 괜찮아요 <br />{' '}
                  <span className={css.highlight1}>유플픽</span>이 함께할{' '}
                  <span className={css.highlight2}>결합 그룹</span>을 <br /> 찾아드려요
                </>
              }
            />
          </div>
          <div ref={card3Ref}>
            <CardItem
              className={`${css.card} ${css.card3}`}
              img={HeroImage3}
              title="멤버십 혜택 지도"
              desc={
                <>
                  {' '}
                  가까운 <span className={css.highlight2}>제휴처 혜택</span>을 <br />{' '}
                  <span className={css.highlight2}>지도</span>로 확인하고 사용해보세요
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
