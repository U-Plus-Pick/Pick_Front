import React from 'react'
import MatchingGrid from './MatchingGrid'

const PaymentSummaryBox = ({
  userStatus,
  totalBillAmount,
  formatCurrency,
  partyMembers,
  apiUserName,
  totalPartyFee,
  togetherDiscount,
  upickFeeLeader,
  upickFeeMember,
  settlementAmount,
  maxPartySize,
}) => {
  return (
    <div className="payment-summary-box">
      <div className="box-header">
        <h3 className="section-title">총 결제 금액</h3>
        <span className="status-text">{formatCurrency(totalBillAmount)}원/월</span>
      </div>

      {/* 매칭 상태 행 */}
      <MatchingGrid
        userStatus={userStatus}
        partyMembers={partyMembers}
        apiUserName={apiUserName}
        maxPartySize={maxPartySize}
      />

      {/* 요금 정보 */}
      <div className="fee-info">
        <div className="fee-row">
          <span className="fee-label">파티원 총 요금</span>
          <span className="fee-amount">{formatCurrency(totalPartyFee)}원</span>
        </div>
        <div className="fee-row">
          <span className="fee-label">투게더로 인한 할인 금액</span>
          <span className="fee-amount">{formatCurrency(togetherDiscount)}원</span>
        </div>
      </div>

      {/* U+Pick 이용료 */}
      <div className="upick-fee">
        <div className="fee-header">
          <span className="service-name">U+Pick 이용료</span>
          <div className="price-info">
            {userStatus === 'leader' ? (
              <>
                <span className="original-price">{formatCurrency(upickFeeMember)}원</span>
                <span className="current-price">{formatCurrency(upickFeeLeader)}원</span>
              </>
            ) : (
              <span className="current-price">{formatCurrency(upickFeeMember)}원</span>
            )}
          </div>
        </div>
        {userStatus === 'leader' && <div className="discount-info">대표자 할인 적용 완료</div>}
      </div>

      {/* 정산받는 금액 */}
      <div className="settlement-row">
        <span className="settlement-label">
          {userStatus === 'leader' ? '정산받는 금액' : '정산하실 금액'}
        </span>
        <span className="settlement-amount">{formatCurrency(settlementAmount)}원</span>
      </div>
    </div>
  )
}

export default PaymentSummaryBox
