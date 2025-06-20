import React from 'react'
import css from '../../styles/scss/HeroSectionCard.module.scss'
import { FiArrowUpRight } from 'react-icons/fi'

const HeroSectionCard = ({ img, title, desc, className, imgClassName }) => {
  return (
    <div className={`${css.card} ${className || ''}`}>
      <img src={img} alt={title} className={imgClassName || ''} />
      <div className={css.divider} />
      <div className={css.cardBody}>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className={css.iconWrapper}>
        <FiArrowUpRight />
      </div>
    </div>
  )
}

export default HeroSectionCard
