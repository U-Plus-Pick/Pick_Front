import React from 'react'
import css from '../styles/scss/HeroSection.module.scss'
import CardItem from './HeroSectionCard'
import HeroImage1 from '../assets/HeroIamge1.png'
import HeroImage2 from '../assets/HeroIamge2.png'
import HeroImage3 from '../assets/HeroIamge3.png'

const HeroSection = () => {
  return (
    <section className={css.hero}>
      <div className={css.content}>
        <h2>
          스마트한 통신 생활
          <br />
          <span>U+Pick</span>에서 지금 시작하세요
        </h2>

        <div className={css.buttonGroup}>
          <button className={css.loginBtn}>로그인 하러 가기</button>
          <button className={css.planBtn}>요금제 상담하기</button>
        </div>

        <div className={css.cardList}>
          <CardItem
            className={css.card1}
            img={HeroImage1}
            title="요금제 추천 ChatBot"
            desc={
              <>
                ChatBot으로 <br />
                <span className={css.highlight1}>U+Pick</span>에서 <br />
                요금제 <span className={css.highlight2}>상담</span>을 받아보세요
              </>
            }
          />
          <CardItem
            className={css.card2}
            imgClassName={css.card2Img}
            img={HeroImage2}
            title="결합 혜택 매칭 시스템"
            desc={
              <>
                <span className={css.highlight2}>혼자여도</span> 괜찮아요
                <br />
                <span className={css.highlight1}>유플픽</span>이 함께할{' '}
                <span className={css.highlight2}>결합 그룹</span>을
                <br />
                찾아드려요
              </>
            }
          />
          <CardItem
            className={`${css.card} ${css.card3}`}
            img={HeroImage3}
            title="멤버십 혜택 지도"
            desc={
              <>
                가까운 <span className={css.highlight2}>제휴처 혜택</span>을 <br />
                <span className={css.highlight2}>지도</span>로 확인하고 사용해보세요
              </>
            }
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
