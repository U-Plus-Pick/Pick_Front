import React from 'react'

const BillCard = ({
  month,
  monthlyFee,
  formatCurrency,
  previousMonthRange,
  onSubmitReceipt,
  isUploading,
  userStatus,
  fileInputRef,
  onFileSelect,
}) => {
  const getButtonText = () => {
    if (isUploading) return '업로드 중...'
    if (userStatus === 'member') return '요금명세서 제출'
    return '납부확인서 제출'
  }

  const showButton = userStatus !== 'none'
  const showEmptyText = userStatus === 'none'
  return (
    <div className="bill-card">
      <h3 className="bill-month">{month}월 이용요금</h3>
      <div className="bill-amount">
        {monthlyFee === 0 || !monthlyFee ? '0원' : `${formatCurrency(monthlyFee)}원`}
      </div>
      <div className="bill-footer">
        <div className="bill-period">{previousMonthRange.fullRange}</div>
        {showButton && (
          <button className="submit-btn" onClick={onSubmitReceipt} disabled={isUploading}>
            {getButtonText()}
          </button>
        )}
        {showEmptyText && <div className="empty-text">제출하실 서류가 없어요</div>}
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        accept=".jpg,.jpeg,.png,.pdf"
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default BillCard
