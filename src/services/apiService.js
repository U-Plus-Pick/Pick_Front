// API 기본 설정
const API_BASE_URL = 'http://localhost:3000' // 같은 도메인에서 API 호출

// 공통 fetch 함수
const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token')

  const defaultHeaders = {
    'Content-Type': 'application/json',
    // JWT 토큰이 있으면 Authorization 헤더에 추가
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  const config = {
    headers: defaultHeaders,
    ...options,
  }

  // FormData인 경우 Content-Type 헤더 제거 (브라우저가 자동 설정)
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type']
  }
  const response = await fetch(`${API_BASE_URL}${url}`, config)

  if (!response.ok) {
    // 응답 본문을 읽어서 더 자세한 에러 정보 제공
    let errorMessage = `API 요청 실패: ${response.status} ${response.statusText}`
    try {
      const errorData = await response.json()
      if (errorData.error || errorData.message) {
        errorMessage += ` - ${errorData.error || errorData.message}`
      }
    } catch {
      // JSON 파싱 실패 시 기본 메시지 사용
    }
    throw new Error(errorMessage)
  }

  return response
}

// 요금제 관련 API
export const planService = {
  // 요금제 목록 조회 (이름만)
  getPlans: async () => {
    try {
      const response = await apiRequest('/api/plans', {
        method: 'GET',
      })

      const plans = await response.json()
      // API 응답에서 plan_name 필드를 사용
      return plans.map(plan => plan.plan_name)
    } catch (error) {
      console.error('요금제 목록 조회 오류:', error)
      throw error
    }
  },
  // 요금제 전체 데이터 조회
  getPlansWithDetails: async () => {
    try {
      const response = await apiRequest('/api/plans', {
        method: 'GET',
      })

      const plans = await response.json()
      // API 응답을 그대로 반환 (이미 plan_name 필드가 있음)
      // plan_monthly_fee는 문자열 형태이므로 숫자 변환
      return plans.map(plan => ({
        ...plan,
        plan_monthly_fee: parseInt(plan.plan_monthly_fee?.replace(/[,원]/g, '')) || 0,
      }))
    } catch (error) {
      console.error('요금제 상세 정보 조회 오류:', error)
      throw error
    }
  },
  // 요금제 변경 (인증 필요)
  changePlan: async newPlan => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('로그인이 필요합니다.')
      }

      console.log('요금제 변경 요청:', { plan_name: newPlan })
      const response = await apiRequest('/api/users/me/plan', {
        method: 'PATCH',
        body: JSON.stringify({ plan_name: newPlan }),
      })

      const result = await response.json()
      console.log('요금제 변경 응답:', result)
      return result
    } catch (error) {
      console.error('요금제 변경 오류:', error)
      throw error
    }
  },
}

// 사용자 관련 API
export const userService = {
  // 사용자 정보 조회 (인증 필요)
  getUserInfo: async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('로그인이 필요합니다.')
      }

      const response = await apiRequest('/api/users/me', {
        method: 'GET',
      })
      // console.log('사용자 정보 조회 응답:', response.json())
      return await response.json()
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error)
      throw error
    }
  },
}

// 파티 관련 API
export const partyService = {
  // 파티 정보 조회 (인증 필요)
  getPartyInfo: async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('로그인이 필요합니다.')
      }

      const response = await apiRequest('/api/party/infor', {
        method: 'GET',
      })

      return await response.json()
    } catch (error) {
      console.error('파티 정보 조회 오류:', error)
      throw error
    }
  },
}

// 파일 업로드 관련 API
export const fileService = {
  // 납부확인서 업로드 (인증 필요)
  uploadPaymentReceipt: async (file, userName, month) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('로그인이 필요합니다.')
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('userName', userName)
      formData.append('month', month)

      const response = await apiRequest('/api/party/documents', {
        method: 'POST',
        body: formData,
      })

      return await response.json()
    } catch (error) {
      console.error('납부확인서 업로드 오류:', error)
      throw error
    }
  },
}

// 파티 참여 관련 API
export const applyService = {
  getApplyAccountInfo: async leaderAccount => {
    try {
      console.log(leaderAccount)
      const token = localStorage.getItem('token')
      if (!token) throw new Error('로그인이 필요합니다.')
      const response = await apiRequest('/api/payments/leader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(leaderAccount),
      })
      const data = await response.json()
      console.log('계좌 정보 조회 응답:', data)
      return data
    } catch (error) {
      console.error('계좌 정보 조회 오류:', error)
      throw error
    }
  },
}

// 통합 API 서비스
export const apiService = {
  ...planService,
  ...userService,
  ...partyService,
  ...fileService,
  ...applyService,
}

export default apiService
