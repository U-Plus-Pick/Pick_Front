import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Chatbot from '../components/Chatbot'
import './ChatbotPage.scss'

const ChatbotPage = () => {
  const [searchParams] = useSearchParams()
  const [initialMessage, setInitialMessage] = useState(null)

  useEffect(() => {
    const type = searchParams.get('type')

    if (type === 'plan') {
      setInitialMessage('요금제 추천에 대해 알려주세요')
    } else if (type === 'matching') {
      setInitialMessage('결합 매칭에 대해 알려주세요')
    } else if (type === 'map') {
      setInitialMessage('멤버십 지도에 대해 알려주세요')
    }
  }, [searchParams])
  return (
    <div className="chatbot-page">
      <div className="chatbot-page-content">
        <div className="chatbot-character">
          <img src="/upi-leaning.png" alt="유피 캐릭터" className="upi-character" />
        </div>
        <Chatbot initialMessage={initialMessage} />
      </div>
    </div>
  )
}

export default ChatbotPage
