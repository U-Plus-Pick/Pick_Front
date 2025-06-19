import React from 'react'
import css from '../../styles/scss/HeroChatBot.module.scss'
import UPI from '../../assets/UPI.png'
import UPIChatbot from '../../assets/HeroUpiChatBot.png'

const HeroChatBot = () => {
  return (
    <section className={css.consult}>
      <div className={css.container}>
        <h2 className={css.title}>
          우리의
          <br />
          시간은 소중하니까.
        </h2>

        <div className={css.content}>
          <div className={css.leftCard}>
            <h3>
              내게 맞는 요금제,
              <br />
              너무 많아 고민되셨나요?
            </h3>

            <div className={css.chatBox}>
              <p className={css.tag}>데이터 많은 요금제 추천해줘</p>
              <div className={css.messageBlock}>
                <div className={css.circleWrap}>
                  <img src={UPI} alt="유피" />
                </div>
                <div className={css.msg}>
                  <strong>유피</strong>
                  <br />
                  데이터가 많은 요금제를 원하는구나!
                  <br />
                  유피가 추천하는 요금제는 ***** 요금제야
                </div>
              </div>
            </div>

            <div className={css.desc}>
              <img className={css.leftImage} src={UPIChatbot} alt="유피" />
              <p>
                <span className={css.highlight2}>유피</span>가 당신의 사용 패턴을 <br />
                분석해 <span className={css.highlight1}>딱 맞는 요금제</span>를<br />
                추천해드립니다.
              </p>
            </div>
          </div>

          <div className={css.rightCard}>
            <div className={css.bgBox}>
              <div className={css.circleWrap}>
                <img src={UPI} alt="유피" />
              </div>

              <div className={css.chatBubble}>
                안녕하세요!
                <br />
                당신만의 요금제 추천 AI, <strong>유피</strong>에요.
                <br />
                무엇을 도와드릴까요?
              </div>
            </div>

            <div className={css.categoryBox}>
              <span>요금</span>
              <span>멤버십</span>
              <span>결합 혜택</span>
            </div>

            <p className={css.rightDesc}>
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
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroChatBot
