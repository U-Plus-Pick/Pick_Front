import React, { useState, useEffect, useCallback, useRef } from 'react'
import { io } from 'socket.io-client'
import './Chatbot.scss'

const Chatbot = ({ initialMessage = null, userId = null }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '안녕하세요! U+의 요금제 추천 AI, 유피예요. 무엇을 도와드릴까요?',
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [chatRooms, setChatRooms] = useState([])
  const [currentChatId, setCurrentChatId] = useState(1)
  const [isLoadingChatRooms, setIsLoadingChatRooms] = useState(false)
  const messagesEndRef = useRef(null)
  const socketRef = useRef(null)
  const currentStreamingMessageRef = useRef(null)

  // 자동 스크롤 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // 메시지가 업데이트될 때마다 스크롤
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Socket.IO 연결 및 이벤트 설정
  useEffect(() => {
    // Socket.IO 연결
    socketRef.current = io('http://localhost:3000')

    // 연결 성공
    socketRef.current.on('connect', () => {
      console.log('Socket.IO 연결됨:', socketRef.current.id)
    })

    // 스트리밍 메시지 시작 (선택적 - 이미 메시지 생성됨)
    socketRef.current.on('chat_response_start', () => {
      console.log('백엔드에서 스트리밍 시작 신호 받음')
    })

    // 스트리밍 메시지 토큰 수신
    socketRef.current.on('chat_response_chunk', data => {
      console.log('토큰 수신:', data.content)
      const { content } = data
      if (currentStreamingMessageRef.current && content) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === currentStreamingMessageRef.current
              ? { ...msg, text: msg.text + content }
              : msg
          )
        )
      }
    })

    // 스트리밍 완료
    socketRef.current.on('chat_response_end', data => {
      console.log('스트리밍 완료:', data.content)
      if (currentStreamingMessageRef.current) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === currentStreamingMessageRef.current ? { ...msg, isStreaming: false } : msg
          )
        )
        currentStreamingMessageRef.current = null
      }
      setIsLoading(false)
    })

    // 에러 처리
    socketRef.current.on('chat_error', data => {
      console.error('채팅 에러:', data.message)
      const errorResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.message || '죄송합니다. 일시적인 오류가 발생했습니다.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorResponse])
      setIsLoading(false)
      currentStreamingMessageRef.current = null
    })

    // 연결 해제
    socketRef.current.on('disconnect', () => {
      console.log('Socket.IO 연결 해제됨')
    })

    // 연결 에러
    socketRef.current.on('connect_error', error => {
      console.error('Socket.IO 연결 에러:', error)
    })

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  // 사용자의 채팅방들을 DB에서 불러오는 함수
  const loadChatRoomsFromDB = useCallback(async () => {
    if (!userId) return

    setIsLoadingChatRooms(true)
    try {
      const response = await fetch(`http://localhost:3000/chat/rooms/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setChatRooms(data.chatRooms || [])
      console.log('채팅방 불러오기 완료:', data.chatRooms)
    } catch (error) {
      console.error('채팅방 불러오기 에러:', error)
    } finally {
      setIsLoadingChatRooms(false)
    }
  }, [userId])

  // 컴포넌트 마운트 시 채팅방 불러오기
  useEffect(() => {
    if (userId) {
      loadChatRoomsFromDB()
    }
  }, [userId, loadChatRoomsFromDB])

  // 채팅방을 DB에 저장하는 함수
  const saveChatToDB = async chatData => {
    if (!userId) {
      console.warn('로그인된 사용자가 없습니다.')
      return
    }

    try {
      const response = await fetch('http://localhost:3000/chat/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...chatData,
          userId: userId, // 사용자 ID 추가
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('채팅 저장 완료:', result)
    } catch (error) {
      console.error('채팅 저장 에러:', error)
    }
  }

  const sendToGPT = useCallback(
    message => {
      if (!socketRef.current || !socketRef.current.connected) {
        console.error('Socket.IO 연결이 없습니다.')
        const errorResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: '연결에 문제가 있습니다. 페이지를 새로고침해주세요.',
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, errorResponse])
        return
      }

      setIsLoading(true)
      console.log('메시지 전송:', message)

      // 즉시 빈 봇 메시지 생성 (스트리밍용)
      const botMessageId = Date.now() + 1
      const initialBotMessage = {
        id: botMessageId,
        sender: 'bot',
        text: '',
        timestamp: new Date(),
        isStreaming: true,
      }
      currentStreamingMessageRef.current = botMessageId
      setMessages(prev => [...prev, initialBotMessage])

      // Socket.IO로 메시지 전송
      socketRef.current.emit('chat_message', {
        message: message,
        conversation: messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
          timestamp: msg.timestamp,
        })),
      })
      console.log('Socket.IO 메시지 전송 완료')
      setIsLoading(false)
    },
    [messages]
  )

  useEffect(() => {
    if (initialMessage) {
      const newMessage = {
        id: Date.now(),
        sender: 'user',
        text: initialMessage,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, newMessage])
      sendToGPT(initialMessage)
    }
  }, [initialMessage, sendToGPT])

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'user',
        text: inputMessage,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, newMessage])
      const messageToSend = inputMessage
      setInputMessage('')
      sendToGPT(messageToSend)
    }
  }

  const handleRecommendationClick = type => {
    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: `${type} 문의`,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, newMessage])
    sendToGPT(`${type}에 대해 알려주세요`)
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const resetChat = async () => {
    // 로그인한 사용자이고, 현재 채팅이 기본 메시지보다 많고, 아직 저장되지 않은 새 채팅이면 저장
    if (userId && messages.length > 1) {
      // 이미 저장된 채팅방인지 확인
      const isAlreadySaved = chatRooms.some(room => room.id === currentChatId)

      if (!isAlreadySaved) {
        const chatData = {
          id: currentChatId,
          title:
            messages.find(m => m.sender === 'user')?.text?.substring(0, 30) + '...' ||
            `채팅 ${currentChatId}`,
          messages: messages,
          createdAt: new Date(),
        }

        // DB에 저장
        await saveChatToDB(chatData)

        // 채팅방 리스트에 추가 (로컬 상태 업데이트)
        setChatRooms(prev => [chatData, ...prev])
      }
    }

    // 새 채팅 시작
    const newChatId = Date.now()
    setCurrentChatId(newChatId)
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: '안녕하세요! U+의 요금제 추천 AI, 유피예요. 무엇을 도와드릴까요?',
        timestamp: new Date(),
      },
    ])
    setInputMessage('')
    setIsLoading(false)
  }

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-window">
        <div className="chatbot-header">
          <div className="traffic-lights">
            <span className="light red"></span>
            <span className="light yellow"></span>
            <span className="light green"></span>
          </div>
        </div>

        <div className="chatbot-content">
          {sidebarVisible && (
            <div className="chatbot-sidebar">
              <div className="sidebar-header">
                <div className="settings-icon">
                  <img src="/user.png" alt="사용자" />
                </div>
                <button className="back-icon" onClick={toggleSidebar}>
                  <span className="toggle-arrow">←</span>
                </button>
              </div>
              <div className="sidebar-section">
                <button className="new-chat-btn" onClick={resetChat}>
                  <div className="sidebar-title">새 채팅</div>
                  <div className="sidebar-subtitle">
                    {userId ? '무엇이든지 대화 내용이 저장됩니다' : '로그인하면 채팅이 저장됩니다'}
                  </div>
                </button>

                {userId && (
                  <>
                    {isLoadingChatRooms ? (
                      <div className="chat-rooms-loading">
                        <div className="loading-text">채팅방을 불러오는 중...</div>
                      </div>
                    ) : chatRooms.length > 0 ? (
                      <div className="chat-rooms-list">
                        <div className="chat-rooms-title">이전 채팅</div>
                        {chatRooms.map(chatRoom => (
                          <button
                            key={chatRoom.id}
                            className="chat-room-item"
                            onClick={() => {
                              setMessages(chatRoom.messages)
                              setCurrentChatId(chatRoom.id)
                            }}
                          >
                            <div className="chat-room-title">{chatRoom.title}</div>
                            <div className="chat-room-date">
                              {new Date(chatRoom.createdAt).toLocaleDateString()}
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="no-chat-rooms">
                        <div className="no-chat-text">저장된 채팅방이 없습니다</div>
                      </div>
                    )}
                  </>
                )}

                {!userId && (
                  <div className="login-required">
                    <div className="login-text">채팅을 저장하려면 로그인이 필요합니다</div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={`chatbot-main ${!sidebarVisible ? 'sidebar-hidden' : ''}`}>
            {!sidebarVisible && (
              <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                <span className="toggle-arrow">→</span>
              </button>
            )}
            <div className="chat-header">
              <div className="chat-avatar">
                <img src="/penguin-character.png" alt="유피" />
              </div>
              <span className="chat-name">유피</span>
            </div>

            <div className="chat-messages">
              {messages.map(message => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className={`message-content ${message.isStreaming ? 'streaming' : ''}`}>
                    {message.text || (message.isStreaming ? '' : '메시지를 불러오는 중...')}
                  </div>
                  {message.sender === 'bot' && <div className="message-time">방금</div>}
                </div>
              ))}
              {isLoading && !messages.some(msg => msg.isStreaming) && (
                <div className="message bot">
                  <div className="message-content typing">유피가 답변을 준비하고 있어요...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="recommendation-options">
              <div className="recommendation-title">추천정보</div>
              <div className="recommendation-buttons">
                <button className="rec-btn" onClick={() => handleRecommendationClick('5G 요금제')}>
                  5G 요금 추천
                </button>
                <button className="rec-btn" onClick={() => handleRecommendationClick('결합할인')}>
                  결합 할인
                </button>
                <button className="rec-btn" onClick={() => handleRecommendationClick('멤버십혜택')}>
                  멤버십 혜택
                </button>
              </div>
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder="무엇이 궁금하신가요?"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="chat-input"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                className="send-button"
                disabled={isLoading || !inputMessage.trim()}
              >
                보내기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
