import React from 'react'
import css from '../../styles/scss/BundleIntro.module.scss'
import penguinGroup from '../../assets/HeroIamge1.png' // 중앙 이미지

const BundleIntro = () => {
  return (
    <section className={css.intro}>
      <div className={css.inner}>
        <h2>
          <span className={css.uplus}>U⁺</span>투게더 결합{' '}
          <span className={css.with}>with U⁺Pick</span>
        </h2>
        <p className={css.subtitle}>
          <strong>U⁺ 고객이라면 누구나</strong>
          <br />
          <strong>U⁺Pick</strong>과 함께 모일수록 커지는 혜택
        </p>

        <img src={penguinGroup} alt="펭귄 그룹" className={css.image} />

        <div className={css.benefitBox}>
          <div className={css.benefit}>
            <h4>모일수록 커지는 혜택</h4>
            <p>
              5명이 결합하면, 한 사람당 요금을
              <br />
              <span>20,000원 할인</span> 받을 수 있어요
            </p>
          </div>
          <div className={css.benefit}>
            <h4>신청만 하면 자동으로 매칭</h4>
            <p>
              함께 할 사람 없어도 괜찮아요
              <br />
              5명을 <span>자동으로 결합</span>해드려요
            </p>
          </div>
          <div className={css.benefit}>
            <h4>결제는 간편하게</h4>
            <p>
              홈페이지에서 결제 신청으로
              <br />
              <span>편리하게</span> 이용할 수 있어요
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BundleIntro
