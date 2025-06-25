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
  // 파일 선택 및 업로드 처리
  const handleFileSelect = async event => {
    const file = event.target.files[0]
    if (!file) return

    try {
      // 기존 onFileSelect 호출 (업로딩 상태 관리)
      if (onFileSelect) {
        onFileSelect(event)
      }

      // 서류 제출 API 호출
    } catch (error) {
      console.error('파일 업로드 실패:', error)
    }
  }

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
        onChange={handleFileSelect}
        accept=".jpg,.jpeg,.png,.pdf"
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default BillCard
