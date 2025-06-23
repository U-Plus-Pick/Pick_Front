import React from 'react'
import css from '../../styles/scss/BundleRole.module.scss'

export default function BundleRoleCard({ title, desc, highlight, img, type }) {
  return (
    <div className={`${css.card} ${css[type]}`}>
      <h3 className={css.title}>{title}</h3> {/* h3에 따로 class 분기 필요 없음 */}
      <img src={img} alt="혜택 이미지" />
      <p>
        {desc}
        {highlight && <span className={css.highlight}>({highlight})</span>}
      </p>
    </div>
  )
}
