import Chatbot from '../components/Chatbot'
import './ChatbotPage.scss'

const ChatbotPage = () => {
  return (
    <div className="chatbot-page">
      <div className="chatbot-page-content">
        <div className="chatbot-character">
          <img src="/upi-leaning.png" alt="유피 캐릭터" className="upi-character" />
        </div>
        <Chatbot />
      </div>
    </div>
  )
}

export default ChatbotPage
