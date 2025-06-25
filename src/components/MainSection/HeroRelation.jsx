import React, { useEffect, useRef } from 'react'
import css from '../../styles/scss/HeroRelation.module.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination } from 'swiper/modules'

import HeroRelation1 from '../../assets/Hero/HeroRelation1.png'
import HeroRelation2 from '../../assets/Hero/HeroRelation2.png'
import HeroRelation3 from '../../assets/Hero/HeroRelation3.png'
import HeroRelationLeft from '../../assets/Hero/HeroRelationLeft.png'
import HeroRelationRight from '../../assets/Hero/HeroRelationRight.png'
import HeroLine from '../../assets/Hero/HeroLine.png'
import HeroLineCurve from '../../assets/Hero/HeroCurveLine.png'
import useScrollRefresh from '../../hooks/useScrollRefresh'

gsap.registerPlugin(ScrollTrigger)

const texts = [
  {
    lines: [
      '바쁜 일상 속',
      '<span class="HeroPink">복잡한 통신 생활</span>',
      '',
      '더 이상',
      '<span class="HeroPurple">놓치지 마세요.</span>',
    ],
  },
  {
    lines: [
      'LG U+는',
      '언제나 <span class="HeroPink">고객님</span>과',
      '더 가깝게 <span class="HeroPurple">연결</span>됩니다.',
    ],
  },
  {
    lines: [
      '<span class="HeroPink">U+Pick</span> 과 함께',
      '요금제부터 멤버십까지',
      '더 <span class="HeroPurple">쉽고</span>, 더 <span class="HeroPurple">간편하게</span>',
    ],
  },
]

const HeroRelation = () => {
  useScrollRefresh()
  const isMobile = window.innerWidth < 1200

  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    if (window.innerWidth < 1600) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=8000',
          scrub: 0.1,
          pin: true,
          anticipatePin: 2,
          snap: 1 / (cardRefs.current.length - 1),
        },
      })

      tl.to(cardRefs.current, {
        rotateY: 180,
        duration: 0.3,
        ease: 'power2.inOut',
        stagger: 0.3,
      })

      tl.to({}, { duration: 0.5 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero-relation" ref={sectionRef} className={css.heroSectionWrapper}>
      <div className={css.heroRelation}>
        <h2 className={css.title}>
          <span className={css.lg}>LG U+</span>의 혜택
          <br />
          <span className={css.pick}>U+Pick</span>으로 더 가깝게
        </h2>

        {!isMobile && (
          <div className={css.content}>
            <img src={HeroRelationLeft} alt="left penguin" className={css.HeroRelationLeft} />
            <div className={css.cardWrapper}>
              <img src={HeroLine} alt="line1" className={css.lineOne} />
              <img src={HeroLine} alt="line2" className={css.lineTwo} />
              <img src={HeroLineCurve} alt="lineCurve" className={css.lineCurve} />

              {[HeroRelation1, HeroRelation2, HeroRelation3].map((img, i) => (
                <div key={i} className={css.card}>
                  <div className={css.cardInner} ref={el => (cardRefs.current[i] = el)}>
                    <div className={css.cardFront}>
                      <img src={img} alt={`card${i + 1}`} className={css[`HeroRelation${i + 1}`]} />
                    </div>
                    <div className={css.cardBack}>
                      <img src={img} alt={`bg${i + 1}`} className={css.cardBackImageBehind} />
                      <div className={css.cardText}>
                        {texts[i].lines.map((line, idx) =>
                          line === '' ? (
                            <br key={idx} />
                          ) : (
                            <p
                              key={idx}
                              className={css.line}
                              dangerouslySetInnerHTML={{ __html: line }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <img src={HeroRelationRight} alt="right penguin" className={css.HeroRelationRight} />
          </div>
        )}

        {isMobile && (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            className={css.mobileSwiper}
          >
            {[HeroRelation1, HeroRelation2, HeroRelation3].map((img, i) => (
              <SwiperSlide key={i}>
                <div className={css.mobileCardBack}>
                  <img src={img} alt={`bg${i + 1}`} className={css.mobileBg} />
                  <div className={css.mobileText}>
                    {texts[i].lines.map((line, idx) =>
                      line === '' ? (
                        <br key={idx} />
                      ) : (
                        <p key={idx} dangerouslySetInnerHTML={{ __html: line }} />
                      )
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  )
}

export default HeroRelation
