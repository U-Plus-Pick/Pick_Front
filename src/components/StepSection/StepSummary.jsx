import React, { useState } from 'react'
import '../../styles/scss/StepSummary.scss'
import { summaryStep } from '../../constants/StepData'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { applyService } from '../../services/apiService'

export default function StepSummary({ onNext, userRole, userApiData, accountInfo }) {
  const isLeader = userRole === 'leader'
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // 정산 정보 조회
      if (userRole === 'leader') {
        // 리더일 때만 계좌 정보
        const accountInfoResult = await applyService.getApplyAccountInfo({
          leader_email: userApiData.user_email,
          leader_name: userApiData.user_name,
          leader_bank_name: accountInfo.userBank,
          leader_account_number: accountInfo.userAccount,
        })
        console.log('정산 정보 응답:', accountInfoResult)
      }

      // 파티 신청
      const bundleApplyResult = await applyService.postBundleApply({ role: userRole })
      console.log('파티 신청 응답:', bundleApplyResult)

      onNext()
    } catch (error) {
      console.error('신청 실패:', error)
      alert('이미 가입되었거나 같은 계좌가 존재합니다.')
    } finally {
      setIsSubmitting(false)
    }
  }
  const userName = userApiData.user_name
  const userPlans = userApiData.plans
  return (
    <div className="card-content">
      <div className="step-title">
        <h2>요금 정산 내용을 알려드릴게요</h2>
      </div>
      <div className="step-summary-wrapper">
        {/* 매칭 멤버 */}
        <div className="summary-card">
          {isLeader ? (
            <>
              <div className="leader-section">
                <div className="seat-label pink">내 자리</div>
                <img className="leader-img" src="/oneUPI.png" alt="대표 자리" />
              </div>
              <div className="member-section">
                <div className="seat-label pink">결합원 자리</div>
                <div className="member-wrapper" style={{ marginTop: 12 }}>
                  {[1, 2, 3, 4].map(idx => (
                    <div className="member-item" key={idx}>
                      <img src="/matching.png" alt="자동 매칭 중" className="matching" />
                      <div className="member-matching-label">자동 매칭</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="leader-section">
                <div className="seat-label pink">결합 대표</div>
                <img className="leader-img" src="/oneUPI.png" alt="대표 자리" />
              </div>
              <div className="member-section">
                <div className="seat-label pink">결합원 자리</div>
                <div className="member-wrapper">
                  {[1, 2, 3, 4].map(idx => (
                    <div className="member-item" key={idx}>
                      {idx === 1 ? (
                        <>
                          <img src="/memberUPI.png" alt="내 자리" className="member-img" />
                          <div className="matching-label pink">내 자리</div>
                        </>
                      ) : (
                        <>
                          <img src="/matching.png" alt="자동 매칭 중" className="matching" />
                          <div className="member-matching-label">자동 매칭</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        {/* 정산 과정 */}
        <div className="summary-card process">
          <h3>📅 6월 1일 ~ 6월 30일</h3>
          <p className="subtitle">결합원/대표 요금 사용 기간</p>
          <div className="process-timeline">
            {summaryStep.map((step, index) => (
              <div className="timeline-step" key={index}>
                <div className="icon-wrap">
                  <div className="icon">{step.icon}</div>
                </div>
                <div className="step-text">
                  <strong>{step.date}</strong>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="process-question">
            <div>
              🤔
              <span className="pink">왜 매월 1일이 정산일인가요?</span>
              <span className="icon-hover-wrap">
                <IoIosInformationCircleOutline />
                <div className="answer">
                  <strong>정산은 모든 결합원의 요금 납부가 완료된 후에 진행돼요.</strong>
                  <br />
                  1. 결합원들의 요금이 자동결제되고,
                  <br /> 2. 결합장이 통신사에 결합 요금을 납부한 뒤,
                  <br />
                  3.납부 확인서까지 등록 <br />이 모든 과정이 월말까지 마무리되면, 다음 달 1일에
                  자동으로 정산금이 환급되는 구조예요.
                </div>
              </span>
            </div>
          </div>
        </div>
        {/* 요금제 요약 */}
        <div className="bill-summary">
          <div className="bill-box">
            <div>
              <p className="bill-title">[{userName}]님의 부담금</p>
              <p className="bill-section-content">
                {isLeader ? '본인 요금제 + 파티원 3명 요금제' : '본인 요금제'}
              </p>
            </div>
            <div>
              <p className="bill-title">[{userName}]님의 요금제</p>
              <p className="bill-section-content">{userPlans}</p>
            </div>
            <div>
              <p className="bill-title">투게더로 인한 할인 금액</p>
              <p className="bill-section-content">20,000원 할인 /월</p>
            </div>
          </div>
          <div className="bill-box">
            <div className="bill-service">
              <p className="bill-usage-title">U+Pick 이용료</p>
              {isLeader ? (
                <div className="bill-usage-fee">
                  <p className="bill-section-content">
                    <span className="strike">2,000원</span>
                    <span className="highlight green">-1,000원</span>
                  </p>
                  <span className="bill-sub-text green right">대표자 할인 적용완료</span>
                </div>
              ) : (
                <div className="bill-usage-fee">
                  <p className="bill-section-content">
                    <span className="highlight green">-2,000원</span>
                  </p>
                </div>
              )}
            </div>
            <div>
              <p className="bill-title">
                {isLeader ? '정산받는 금액' : '결제 금액'}
                {isLeader ? (
                  <span className="bill-sub-title">3명 요금제 금액만큼 환급받게 돼요!</span>
                ) : (
                  <span className="bill-sub-title">
                    (U+Pick 이용료가 적용된 금액이 결제됩니다.)
                  </span>
                )}
              </p>
              <p className="bill-section-content">
                {isLeader
                  ? '전체 요금제 - (본인 요금제 + 1,000원)'
                  : `[${userApiData.user_name}]님의 요금제 - 18,000원`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        className="step-next"
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{
          backgroundColor: isSubmitting ? '#ccc' : '#e6007e',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
        }}
      >
        {isSubmitting ? '처리 중' : '신청 완료하기'}
      </button>
    </div>
  )
}
