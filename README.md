![image](https://github.com/user-attachments/assets/36e40504-633a-47c9-a790-07bd92c9e027)

>당신의 U+, 당신만의 AI

# U+Pick Frontend

## 개요

LG U+ 고객용 맞춤 요금제 추천 및 결합 할인 플랫폼의 React 기반 프론트엔드 애플리케이션입니다.  
Vite를 이용해 빠른 개발 환경을 제공하며, React Router와 Zustand로 상태 관리 및 라우팅을 구현했습니다.

---

## 주요 기능

- AI 챗봇 UI 및 자연어 스트리밍 응답
- 회원가입, 로그인, 마이페이지 UI
- 요금제 리스트 및 추천, 비교 기능
- 결합 할인 매칭 신청 및 파티 관리
- 위치 기반 멤버십 혜택 지도
- 반응형 웹 UI 및 접근성 고려

---

## 기술 스택

| 구분       | 기술                                              |
|------------|---------------------------------------------------|
| 프레임워크 | React                                             |
| 번들러    | Vite                                              |
| 상태관리  | Zustand, React Context                            |
| 라우팅    | React Router                                      |
| 스타일링  | CSS, SCSS, Bootstrap                              |
| API 통신  | Axios                                             |

|![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | ![Axios](https://img.shields.io/badge/Axios-7952B3?)

---

## 디렉터리 구조

````

📦 frontend/
├── public/                # 정적 리소스 (아이콘, 이미지 등)
├── src/
│   ├── apis/              # 백엔드 API 호출 함수
│   ├── assets/            # 이미지 및 폰트 자산
│   ├── common/            # 상수, 공통 함수 및 스타일
│   ├── components/        # 재사용 UI 컴포넌트
│   ├── hooks/             # 커스텀 훅
│   ├── pages/             # 라우팅 페이지 컴포넌트
│   ├── router/            # 라우터 설정
│   ├── store/             # 전역 상태 관리
│   ├── utils/             # 유틸 함수 모음
│   └── main.jsx           # 앱 진입점
├── index.html             # SPA HTML 템플릿
├── package.json           # 의존성 관리
├── vite.config.js         # Vite 설정
└── README.md              # 프론트엔드 설명서

````

---

## 실행 방법

```bash
npm install
npm run dev
````

---

## 주요 컴포넌트 및 페이지

* `ChatbotPage.jsx` : AI 챗봇 인터페이스
* `PlanList.jsx` / `PlanCompare.jsx` : 요금제 리스트 및 비교
* `PartyMatch.jsx` : 결합 매칭 신청 UI
* `MyPage.jsx` : 사용자 프로필 및 결합 상태 확인
* `MembershipMap.jsx` : 위치 기반 멤버십 혜택 지도 (개발 중)

---

## 참고

* UI 디자인은 Figma 최종 시안 기반
* 코드 스타일은 ESLint, Prettier 적용
