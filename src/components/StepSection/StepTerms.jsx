import React, { useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { MdNavigateNext } from 'react-icons/md'
import { termsContents } from '../../constants/StepData'

const StepTerms = ({ onNext }) => {
  // 현재 선택된 약관 항목
  const [selectedTerm, setSelectedTerm] = useState('privacy')
  // 체크된 약관 목록
  const [checkedTerms, setCheckedTerms] = useState([])

  const handleToggleCheck = key => {
    if (checkedTerms.includes(key)) {
      setCheckedTerms(prev => prev.filter(item => item !== key))
    } else {
      setCheckedTerms(prev => [...prev, key])
    }
  }
  const allChecked = checkedTerms.length === termsContents.length
  const handleToggleAll = () => {
    if (checkedTerms.length === termsContents.length) {
      // 전체 해제
      setCheckedTerms([])
    } else {
      // 전체 선택
      setCheckedTerms(termsContents.map(term => term.key))
    }
  }

  return (
    <div className="card-content">
      <div className="step-title">
        <h2>
          결합대표와 개인 정보를 공유하고
          <br />
          결합을 완료하기 위해 약관 동의가 필요해요
        </h2>
      </div>
      {/* 약관 카드 영역 */}
      <div className="step-card-wrapper terms">
        {/* 좌측 : 약관 목록 */}
        <div className="step-card-twin">
          {termsContents.map(term => (
            <div key={term.key} className="terms-item" onClick={() => setSelectedTerm(term.key)}>
              <button
                className="terms-check"
                onClick={e => {
                  e.stopPropagation()
                  handleToggleCheck(term.key)
                }}
              >
                <FaCircleCheck color={checkedTerms.includes(term.key) ? 'green' : '#ccc'} />
              </button>
              <div className="terms-text">
                <div>
                  <p className="terms-title">{term.title}</p>
                  <button className="terms-detail">
                    <MdNavigateNext />
                  </button>
                </div>
                <p className="terms-desc">{term.desc}</p>
              </div>
            </div>
          ))}
          {/* 전체 선택 item */}
          <div className="terms-item" onClick={handleToggleAll}>
            <button
              className="terms-check"
              onClick={e => {
                e.stopPropagation()
                handleToggleAll()
              }}
            >
              <FaCircleCheck color={allChecked ? 'green' : '#ccc'} />
            </button>
            <div className="terms-text">
              <p className="terms-title">전체 선택</p>
            </div>
          </div>
        </div>

        {/* 우측 : 상세 내용 */}
        <div className="step-card-twin">
          <div className="terms-detail-content">
            {Object.entries(
              termsContents.find(term => term.key === selectedTerm)?.detail || {}
            ).map(([title, content]) => (
              <div key={title} style={{ marginBottom: '12px' }}>
                <strong>{title}</strong>
                <p style={{ whiteSpace: 'pre-line', marginTop: '4px' }}>{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 전체 체크 시 다음 버튼 활성화 */}
      <button
        className="step-next"
        onClick={onNext}
        disabled={!allChecked}
        style={{
          backgroundColor: allChecked ? '#e6007e' : '#ccc',
          cursor: allChecked ? 'pointer' : 'not-allowed',
        }}
      >
        다음
      </button>
    </div>
  )
}

export default StepTerms
