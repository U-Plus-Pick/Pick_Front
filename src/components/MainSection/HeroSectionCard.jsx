import React from 'react'
import css from '../../styles/scss/HeroSectionCard.module.scss'
import { FiArrowUpRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const HeroSectionCard = ({ img, title, desc, className, imgClassName, link }) => {
  const navigate = useNavigate()

  return (
    <div className={`${css.card} ${className || ''}`}>
      <img src={img} alt={title} className={imgClassName || ''} />
      <div className={css.divider} />
      <div className={css.cardBody}>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div
        className={css.iconWrapper}
        onClick={() => link && navigate(link)}
        style={{ cursor: link ? 'pointer' : 'default' }}
      >
        <FiArrowUpRight />
      </div>
    </div>
  )
}

export default HeroSectionCard
