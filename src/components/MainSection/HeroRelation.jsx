import React from 'react'
import css from '../../styles/scss/HeroRelation.module.scss'
import HeroRelation1 from '../../assets/HeroRelation1.png'
import HeroRelation2 from '../../assets/HeroRelation2.png'
import HeroRelation3 from '../../assets/HeroRelation3.png'
import HeroRelationLeft from '../../assets/HeroRelationLeft.png'
import HeroRelationRight from '../../assets/HeroRelationRight.png'
import HeroLine from '../../assets/HeroLine.png'
import HeroLineCurve from '../../assets/HeroCurveLine.png'

const HeroRelation = () => {
  return (
    <section className={css.heroRelation}>
      <h2 className={css.title}>
        <span className={css.lg}>LG U+</span>의 혜택
        <br />
        <span className={css.pick}>U+Pick</span>으로 더 가깝게
      </h2>

      <div className={css.content}>
        <img src={HeroRelationLeft} alt="left penguin" className={css.HeroRelationLeft} />

        <div className={css.cardWrapper}>
          <img src={HeroLine} alt="line1" className={css.lineOne} />
          <img src={HeroLine} alt="line1" className={css.lineTwo} />
          <img src={HeroLineCurve} alt="line2" className={css.lineCurve} />

          <div className={css.card}>
            <img src={HeroRelation1} alt="card1" className={css.HeroRelation1} />
          </div>
          <div className={css.card}>
            <img src={HeroRelation2} alt="card2" className={css.HeroRelation2} />
          </div>
          <div className={css.card}>
            <img src={HeroRelation3} alt="card3" className={css.HeroRelation3} />
          </div>
        </div>

        <img src={HeroRelationRight} alt="right penguin" className={css.HeroRelationRight} />
      </div>
    </section>
  )
}

export default HeroRelation
