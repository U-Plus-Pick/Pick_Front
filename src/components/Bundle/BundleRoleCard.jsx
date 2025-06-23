import React from 'react'
import css from '../../styles/scss/BundleRole.module.scss'
import BundleIntro1 from '../../assets/BundleIntro1.png'

export default function BundleRoleCard({ title, desc, highlight, activeTab }) {
  return (
    <div className={`${css.card} ${css[activeTab]}`}>
      <h3>{title}</h3>
      <img src={BundleIntro1} alt="혜택 이미지" />
      <p>
        {desc}
        {highlight && <span className={css.highlight}>({highlight})</span>}
      </p>
    </div>
  )
}
