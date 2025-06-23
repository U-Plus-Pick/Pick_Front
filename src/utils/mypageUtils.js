// 전 달의 날짜 범위를 계산하는 함수
export const getPreviousMonthDateRange = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  // 전 달 계산
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1
  const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear

  // 전 달의 마지막 날 계산
  const lastDayOfPreviousMonth = new Date(previousYear, previousMonth, 0).getDate()

  // 년도를 2자리로 포맷 (예: 2025 → 25)
  const yearShort = previousYear.toString().slice(-2)

  // 월을 2자리로 포맷 (예: 5 → 05)
  const monthFormatted = previousMonth.toString().padStart(2, '0')

  return {
    startDate: `${yearShort}.${monthFormatted}.01`,
    endDate: `${yearShort}.${monthFormatted}.${lastDayOfPreviousMonth.toString().padStart(2, '0')}`,
    fullRange: `${yearShort}.${monthFormatted}.01 ~ ${yearShort}.${monthFormatted}.${lastDayOfPreviousMonth.toString().padStart(2, '0')}`,
  }
}

// 숫자를 천 단위 콤마 포맷으로 변환하는 함수
export const formatCurrency = amount => {
  const numAmount = Number(amount)
  return isNaN(numAmount) ? '0' : numAmount.toLocaleString()
}

// 상수들
export const TOGETHER_DISCOUNT = 100000 // 투게더로 인한 할인 금액
export const UPICK_FEE_LEADER = 1000 // 리더 U+Pick 이용료 (할인 적용)
export const UPICK_FEE_MEMBER = 2000 // 멤버 U+Pick 이용료
export const MAX_PARTY_SIZE = 5 // 최대 파티원 수 (리더 포함)
