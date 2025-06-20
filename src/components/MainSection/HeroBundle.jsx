import React from 'react'
import css from '../../styles/scss/HeroBundle.module.scss'
import HeroBundle1 from '../../assets/HeroBundle1.png'
import HeroBundle2 from '../../assets/HeroBundle2.png'

const HeroBundle = () => {
  return (
    <section className={css.bundleSection}>
      <div className={css.imageGroup}>
        <div className={css.left}>
          <img src={HeroBundle1} alt="결합 소개 목업" className={css.mockupImage} />
        </div>

        <div className={css.right}>
          <img src={HeroBundle2} alt="결합 유형 선택 안내" className={css.cardImage} />
          <div className={css.desc}>
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
