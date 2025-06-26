![image](https://github.com/user-attachments/assets/36e40504-633a-47c9-a790-07bd92c9e027)

> 당신의 U+, 당신만의 AI

# U+Pick (유플픽) 
- LG U+ 맞춤형 AI 챗봇 & 결합 할인 & 위치 기반 멤버십 혜택 안내 플랫폼

**U+Pick**은 LG U+ 고객을 위한 **AI 기반 챗봇**, **지인 결합 할인 매칭**, **위치 기반 멤버십 혜택 안내**를 통합 제공하는 플랫폼입니다.  
고객의 통신 서비스 경험을 향상시키고 **실질적인 비용 절감 및 편리함**을 목표로 합니다.
 
 ---
 
# 💡 서비스 소개  
📱 플랫폼 이름  
U+Pick (유플픽)  

🤖 챗봇 이름  
UPI (U+ Personal Intelligence)  
<img src="https://github.com/user-attachments/assets/a13af22c-7738-4b16-bc73-d704c3c9058a" width="200"/>




🎯 목적  
LG U+ 이용 고객의 통신 서비스 경험을 향상시키기 위해, 다음과 같은 기능을 통합 제공하는 플랫폼을 구축하고자 합니다.

🧠 AI 기반 챗봇  
고객의 기본 정보와 이용 패턴을 바탕으로 적합한 요금제와 각 요금제에 포함된 주요 혜택을 안내하고 결합 할인과 멤버십 혜택에 대해 안내하는 AI 챗봇을 통해 사용자의 편의성을 높입니다. 

👥 지인 결합 할인 매칭 기능  
결합 할인 혜택을 받고자 하는 고객들이 플랫폼 내에서 함께 결합할 수 있도록 자동 매칭 기능을 제공하여,
지인을 직접 찾기 어려운 고객도 손쉽게 결합 할인을 활용할 수 있도록 지원합니다.

🗺️ 위치 기반 멤버십 혜택 안내  
사용자의 현재 위치를 기반으로,
주변 상권에서 사용할 수 있는 LG U+ 멤버십 혜택 정보를 지도 기반 시각화로 제공하여 혜택 활용도를 높입니다.


---

## 📅 프로젝트 기간

**2025.06.09 ~ 2025.06.27**

---

## 👨‍💻 팀원 소개


<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/110558148?v=4" width="100" /><br/>
      <strong>한여준</strong><br/>
      <a href="https://github.com/Hanyeojun">@Hanyeojun</a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/63743294?v=4" width="100" /><br/>
      <strong>임재찬</strong><br/>
      <a href="https://github.com/alex8396">@alex8396</a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/101700659?v=4" width="100" /><br/>
      <strong>최영준</strong><br/>
      <a href="https://github.com/udwns310">@udwns310</a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/88296511?v=4" width="100" /><br/>
      <strong>이예은</strong><br/>
      <a href="https://github.com/yeeun426">@yeeun426</a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/180901036?v=4" width="100" /><br/>
      <strong>박용규</strong><br/>
      <a href="https://github.com/yonggyu99">@yonggyu99</a>
    </td>
  </tr>
</table>

---

## 🔗 관련 링크

- [🔗 프론트엔드 Repo](https://github.com/U-Plus-Pick/Pick_Front)
- [🔗 백엔드 Repo](https://github.com/U-Plus-Pick/Pick_Back)
- [🔗 프로젝트 Notion](https://wonderful-dewberry-9d0.notion.site/04-U-Pick-206796e7580e80cf8e1cefc9df8d4c23?source=copy_link)
- [🔗 최종 시안 Figma](https://www.figma.com/design/qaATYVnUNOeFKnJQU6mdX2/U-Pick?node-id=0-1&p=f&t=FEsA1aEdVqXb2dNQ-0)

---

# 🌐 U+Pick Frontend

## 개요

U+Pick은 React 기반의 LG U+ 고객 맞춤 AI 챗봇 & 결합 할인 & 위치 기반 멤버십 혜택 안내 프론트엔드 애플리케이션입니다.  
AI 챗봇, 결합 신청, 마이페이지, 위치 기반 멤버십 등 다양한 기능을 제공합니다.

---

## 주요 기능

- AI 챗봇 UI 및 스트리밍 응답 처리
- 요금제 리스트 / 비교 / 추천
- 결합 혜택 안내
- 결합 파티 신청 및 상태 관리  
- 위치 기반 멤버십 혜택 지도 안내

---

## 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)  ![SCSS](https://img.shields.io/badge/SCSS-cc6699.svg?&style=flat&logo=Sass&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

---


## 디렉터리 구조

````

📦 frontend/
├── public/                
├── src/
│   ├── assets/            
│   ├── constant/          
│   ├── components/        
│   ├── hooks/             
│   ├── layouts/            
│   ├── pages/             
│   ├── services/          
│   ├── router/            
│   ├── styles/             
│   └── utils/             
├── index.html            
├── package.json           
├── vite.config.js         
└── README.md             

````

---

## 실행 방법

```bash
npm install
npm run dev
````

---

## 주요 컴포넌트 및 페이지

* `MainPage.jsx` : 메인페이지  
  <img src="https://github.com/user-attachments/assets/da5df174-fff8-413a-bd36-b497d7b7de63" alt="MainPage" width="500"/>  
* `ChatbotPage.jsx` : AI 챗봇 인터페이스
  <!-- ChatbotPage.jsx : AI 챗봇 인터페이스 -->
  <img src="https://github.com/user-attachments/assets/0934a0be-0756-4759-82b8-fb73be1ad97e" alt="ChatbotPage" width="500"/>
* `BunddlePage.jsx` : 결합 안내 페이지  
  <img src="https://github.com/user-attachments/assets/43c0018b-b6ad-4b06-90d8-d3d373fdd5c0" alt="BunddlePage" width="500"/>
* `BunddleApplyPage.jsx` : 결합 매칭 신청 페이지  
  <img src="https://github.com/user-attachments/assets/bd8170ad-c858-4c52-b821-2af30140c469" alt="BunddleApplyPage" width="500"/>


* `MyPage.jsx` : 사용자 프로필 및 결합 상태 확인 (마이 페이지)  
  <img src="https://github.com/user-attachments/assets/1cb923a4-fb20-4bdb-b225-5f99d67cec8c" alt="BunddleApplyPage" width="500"/>


* `MembershipPage.jsx` : 위치 기반 멤버십 혜택 안내 페이지  
  <img src="https://github.com/user-attachments/assets/4b31c24b-3c09-4875-abab-d693a20b01c4" alt="BunddleApplyPage" width="500"/>


---

## 참고 사항

UI 디자인은 Figma 최종 시안 기반
코드 스타일은 ESLint, Prettier 적용

 




