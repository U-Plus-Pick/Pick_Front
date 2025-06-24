import React, { useEffect, useRef } from 'react'
import css from '../../styles/scss/HeroChatBot.module.scss'
import UPI from '../../assets/Hero/UPI.png'
import UPIChatbot from '../../assets/Hero/HeroUpiChatBot.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrollRefresh from '../../hooks/useScrollRefresh'

gsap.registerPlugin(ScrollTrigger)

const HeroChatBot = () => {
  useScrollRefresh()

  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const leftCardRef = useRef(null)
  const h3Ref = useRef(null)
  const chatBoxRef = useRef(null)
  const tagRef = useRef(null)
  const circleImgRef = useRef(null)
  const msgRef = useRef(null)
  const leftImageRef = useRef(null)
  const descRef = useRef(null)

  const rightCardRef = useRef(null)
  const rightCircleRef = useRef(null)
  const chatBubbleRef = useRef(null)
  const categoryRef = useRef(null)
  const rightDescRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=800%',
          pin: true,
          scrub: false,
        },
      })

      // 왼쪽 카드 순서
      tl.from(titleRef.current, { opacity: 0, y: 20, duration: 1 })
        .from(leftCardRef.current, { opacity: 0, y: 30, duration: 0.8 })
        .from(h3Ref.current, { opacity: 0, y: 20, duration: 0.8 })
        .from(chatBoxRef.current, { opacity: 0, y: 20, duration: 0.8 })
        .from(tagRef.current, { opacity: 0, y: 10, duration: 1 })
        .from(circleImgRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
          onStart: () => {
            if (msgRef.current) {
              gsap.to(msgRef.current, {
                opacity: 1,
                duration: 0.5,
                onStart: () => {
                  streamText(
                    msgRef.current,
                    `유피\n데이터가 많은 요금제를 원하는구나!\n유피가 추천하는 요금제는 ***** 요금제야`
                  )
                },
              })
            }
          },
        })

        .from(leftImageRef.current, { opacity: 0, y: 20, duration: 1 })
        .from(descRef.current, { opacity: 0, y: 20, duration: 1 })

      // 오른쪽 카드 순서
      tl.from([rightCardRef.current, rightCircleRef.current], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      })
        .from(
          chatBubbleRef.current,
          {
            opacity: 0,
            duration: 0.5,
            onComplete: () =>
              streamText(
                chatBubbleRef.current,
                `안녕하세요!\n당신만의 요금제 추천 AI, 유피에요.\n무엇을 도와드릴까요?`
              ),
          },
          '+=0.2'
        )
        .from(categoryRef.current, { opacity: 0, y: 20, duration: 1 }, '+=0.3')
        .from(categoryRef.current.querySelectorAll('span'), {
          opacity: 0,
          y: 10,
          stagger: 0.2,
          duration: 1,
        })
        .from(rightDescRef.current, { opacity: 0, y: 20, duration: 1 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const streamText = (element, text) => {
    if (!element) return
    element.style.opacity = '1'
    element.innerHTML = ''
    let i = 0
    const chars = text.split('')
    const interval = setInterval(() => {
      if (i < chars.length) {
        element.innerHTML += chars[i] === '\n' ? '<br>' : chars[i]
        i++
      } else {
        clearInterval(interval)
      }
    }, 30)
  }

  return (
    <section id="hero-chatbot" className={css.consult} ref={sectionRef}>
      <div className={css.container}>
        <h2 className={css.title} ref={titleRef}>
          우리의
          <br />
          시간은 소중하니까.
        </h2>

        <div className={css.content}>
          <div className={css.leftCard} ref={leftCardRef}>
            <h3 ref={h3Ref}>
              내게 맞는 요금제,
              <br />
              너무 많아 고민되셨나요?
            </h3>

            <div className={css.chatBox} ref={chatBoxRef}>
              <p className={css.tag} ref={tagRef}>
                데이터 많은 요금제 추천해줘
              </p>
              <div className={css.messageBlock}>
                <div className={css.circleWrap} ref={circleImgRef}>
                  <img src={UPI} alt="유피" />
                </div>
                <div className={css.msg} ref={msgRef}></div>
              </div>
            </div>

            <div className={css.desc}>
              <img className={css.leftImage} ref={leftImageRef} src={UPIChatbot} alt="유피" />
              <p ref={descRef}>
                <span className={css.highlight2}>유피</span>가 당신의 사용 패턴을 <br />
                분석해 <span className={css.highlight1}>딱 맞는 요금제</span>를<br />
                추천해드립니다.
              </p>
            </div>
          </div>

          <div className={css.rightCard} ref={rightCardRef}>
            <div className={css.bgBox}>
              <div className={css.circleWrap} ref={rightCircleRef}>
                <img src={UPI} alt="유피" />
              </div>
              <div className={css.chatBubble} ref={chatBubbleRef}></div>
            </div>

            <div className={css.categoryBox} ref={categoryRef}>
              <span>요금</span>
              <span>멤버십</span>
              <span>결합 혜택</span>
            </div>

            <div className={css.rightDesc} ref={rightDescRef}>
              <div className={css.rightDescTitle}>
                <span className={css.highlight1}>유피</span>와 대화하며
                <br />
                <span className={css.highlight2}>멤버십</span>을 더 스마트하게
              </div>
              <br />
              놓치기 쉬운 혜택
              <br />
              혜택 조회부터, 혜택 플랫폼 위치까지
              <br />
              이젠 <span className={css.brand}>U+Pick</span>이 챙겨드립니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroChatBot
