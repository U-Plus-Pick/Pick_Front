import Chatbot from '../components/Chatbot'
import '../styles/scss/ChatbotPage.scss'

const ChatbotPage = () => {
  return (
    <div className="chatbot-page">
      <div className="chatbot-page-content">
        <div className="speech-bubble suggest-bubble">
          <h3 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>추천 질문을 알려드려요!</h3>
          <ul className="suggest-list pretty">
            <li>
              <span className="emoji">💡</span>영상 많이 보고 전화는 많이 안 하는데 요금제
              추천해줄래?
            </li>
            <li>
              <span className="emoji">⭐</span>결합할인에는 어떤 종류가 있어?
            </li>
            <li>
              <span className="emoji">🎁</span>멤버십 혜택은 어떤 게 있어?
            </li>
          </ul>
        </div>
        <div className="chatbot-character">
          <img src="/upi-leaning.png" alt="유피 캐릭터" className="upi-character" />
        </div>
        <Chatbot />
      </div>
    </div>
  )
}

export default ChatbotPage
