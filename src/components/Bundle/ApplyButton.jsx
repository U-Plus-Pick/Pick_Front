import React from 'react'
import css from '../../styles/scss/BundleApplyButton.module.scss'

export default function ApplyButton({ onClick }) {
  return (
    <button className={css.applyButton} onClick={onClick}>
      신청하기
    </button>
  )
}
