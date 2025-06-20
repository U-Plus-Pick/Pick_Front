import React, { useEffect, useRef } from 'react'
import css from '../../styles/scss/HeroMembershipMap.module.scss'
import HeroMap from '../../assets/HeroMap.png'
import HeroMapInfo from '../../assets/HeroMapInfo.png'
import HeroCGV from '../../assets/HeroCGV.png'
import HeroGS from '../../assets/HeroGS.png'
import HeroMapMarker from '../../assets/HeroMapMarker.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroMembershipMap = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardRef = useRef(null)
  const mapRef = useRef(null)
  const pinkBoxRef = useRef(null)
  const pinkLineRef = useRef(null)
  const purpleLineRef = useRef(null)
  const block1Ref = useRef(null)
  const logosRef = useRef(null)
  const purpleBoxRef = useRef(null)
  const block2Ref = useRef(null)
  const mapInfoImageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=700%',
          scrub: false,
          pin: true,
        },
      })

      tl.from(titleRef.current, { opacity: 0, y: 20, duration: 0.6 })

        .from([cardRef.current, mapRef.current], {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power2.out',
        })

        .from(pinkBoxRef.current, {
          opacity: 0,
          scale: 0.7,
          duration: 0.5,
          ease: 'power2.out',
        })

        // pinkLine 애니메이션: 아래→위 세로선 → 왼→오 가로선
        .fromTo(
          pinkLineRef.current,
          { scaleY: 0, transformOrigin: 'bottom top' },
          {
            scaleY: 1,
            duration: 0.5,
            ease: 'power2.out',
          }
        )
        .fromTo(
          pinkLineRef.current,
          { scaleX: 0, transformOrigin: 'left right' },
          {
            scaleX: 1,
            duration: 0.5,
            ease: 'power2.out',
          }
        )
        .from(block1Ref.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        })

        .from(logosRef.current.querySelectorAll('div'), {
          opacity: 0,
          y: 20,
          stagger: 0.2,
          duration: 0.4,
        })

        .from(purpleBoxRef.current, {
          opacity: 0,
          scale: 0.7,
          duration: 0.5,
          ease: 'power2.out',
        })

        // purpleLine 애니메이션: 위→아래 세로선 → 오→왼 가로선
        .fromTo(
          purpleLineRef.current,
          { height: 0 },
          {
            height: '130px',
            duration: 0.6,
            ease: 'power2.out',
          }
        )
        .fromTo(
          purpleLineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 0.5,
            ease: 'power2.out',
          }
        )
        .fromTo(
          purpleLineRef.current,
          { scaleX: 0, transformOrigin: 'right center' },
          {
            scaleX: 1,
            duration: 0.5,
            ease: 'power2.out',
          }
        )

        .from(block2Ref.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        })

        .from(mapInfoImageRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.4,
        })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={css.mapSection} ref={sectionRef}>
      <h2 className={css.title} ref={titleRef}>
        바로 옆 <span className={css.highlight}>멤버십</span> 혜택
        <br />
        놓치지 마세요.
      </h2>

      <div className={css.cardWrapper}>
        <div className={css.card} ref={cardRef}>
          <div className={css.leftContent}>
            <div className={css.block} ref={block1Ref}>
              <h3>
                혜택 <span className={css.pink}>플랫폼 위치</span>를 한 눈에
              </h3>
              <p>분석해 딱 맞는 요금제를 추천해드립니다.</p>
              <div className={css.logoCards} ref={logosRef}>
                <div className={css.logoCard}>
                  <img src={HeroCGV} alt="CGV" />
                </div>
                <div className={css.logoCard}>
                  <img src={HeroGS} alt="GS25" />
                </div>
              </div>
            </div>

            <div className={css.block} ref={block2Ref}>
              <h3>
                혜택 플랫폼의 <span className={css.purple}>정보 제공</span>
              </h3>
              <p>
                <span className={css.pink}>멤버십</span> 혜택을 받을 수 있는
                <br />
                플랫폼의 <span className={css.purple}>정보</span>를 함께 알려드려요.
              </p>
              <img
                src={HeroMapInfo}
                alt="GS25 상세정보 박스"
                className={css.mapInfoImage}
                ref={mapInfoImageRef}
              />
            </div>
          </div>

          <div className={css.rightContent}>
            <div className={css.mapWrapper}>
              <img src={HeroMap} alt="지도" className={css.mapImage} ref={mapRef} />

              <div className={css.purpleBox} ref={purpleBoxRef}>
                <img src={HeroMapInfo} className={css.focusedImageInsideBox} />
              </div>

              <div className={css.pinkBox} ref={pinkBoxRef}>
                <img src={HeroMapMarker} className={css.focusedImageInsideBox} />
              </div>
            </div>
          </div>
        </div>
        <div className={css.purpleLine} ref={purpleLineRef}></div>
        <div className={css.pinkLine} ref={pinkLineRef}></div>
      </div>
    </section>
  )
}

export default HeroMembershipMap
