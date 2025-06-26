import React from 'react'
import css from '../../styles/scss/BundleIntro.module.scss'
import BundleIntro1 from '../../assets/BundleIntro/BundleIntro1.png'
import BundleIntro2 from '../../assets/BundleIntro/BundleIntro2.png'
import BundleIntro3 from '../../assets/BundleIntro/BundleIntro3.png'
import BundleIntroTitle from '../../assets/BundleIntro/BundleIntroTitle.png'

const BundleIntro = () => {
  return (
    <section className={css.intro}>
      <div className={css.topBg}>
        <div className={css.inner}>
          <div className={css.left}>
            <div className={css.heading}>
              <h2 className={css.titleLine}>
                <span className={css.uplus}>U⁺</span>
                <span className={css.titleText}>투게더 결합</span>
                <span className={css.with}>
                  with <span className={css.uplussub}>U⁺</span>
                  <span className={css.pick}>Pick</span>
                </span>
              </h2>
              <div className={css.space}></div>
              <div className={css.sub1}>
                <p>U⁺고객이라면 누구나</p>
              </div>
              <p className={css.sub2}>U⁺Pick과 함께 모일수록 커지는 혜택</p>
            </div>
          </div>
          <div className={css.right}>
            <img src={BundleIntroTitle} alt="Bundle Main Title" />
          </div>
        </div>
      </div>

      <div className={css.cardWrapper}>
        <div className={css.benefitBox}>
          <div className={css.benefit}>
            <h4>모일수록 커지는 혜택</h4>
            <img src={BundleIntro1} alt="모일수록 혜택" className={css.BundleIntro1} />
            <p>
              5명이 결합하면, 한 사람당 요금을
              <br />
              <span>20,000원 요금 할인</span>을 받을 수 있어요
            </p>
          </div>
          <div className={css.benefit}>
            <h4>신청만 하면 자동으로 매칭</h4>
            <img src={BundleIntro2} alt="자동 매칭" className={css.BundleIntro2} />
            <p>
              함께 할 사람 없어도 괜찮아요
              <br />
              5명을 <span>자동으로 결합</span>해드려요
            </p>
          </div>
          <div className={css.benefit}>
            <h4>결제는 간편하게</h4>
            <img src={BundleIntro3} alt="간편 결제" className={css.BundleIntro3} />
            <p>
              홈페이지의 결제 방식으로
              <br />
              <span>편리하게 이용</span>할 수 있어요
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BundleIntro
