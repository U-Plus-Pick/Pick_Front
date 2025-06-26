import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import '../styles/scss/Chatbot.scss'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Chatbot = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '안녕하세요! U+의 요금제 추천 AI, 유피예요. 무엇을 도와드릴까요?<br>궁금한 점을 말씀해주시면 최선을 다해 답변해드릴게요!',
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [chatRooms, setChatRooms] = useState([])
  const [currentChatId, setCurrentChatId] = useState(1)
  const [isLoadingChatRooms, setIsLoadingChatRooms] = useState(false)
  const [userId, setUserId] = useState(null)
  const messagesEndRef = useRef(null)
  const socketRef = useRef(null)
  const currentStreamingMessageRef = useRef(null)
  const messagesRef = useRef(messages)
  const BASE_URL = 'https://port-0-pick-back-mcbpw7z924e60211.sel5.cloudtype.app/'

  // JWT 토큰에서 사용자 ID 추출 함수
  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return null

      // JWT 토큰을 디코딩 (base64 디코딩)
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.id
    } catch (error) {
      console.error('토큰 디코딩 에러:', error)
      return null
    }
  }
  // 컴포넌트 마운트 시 토큰에서 사용자 ID 추출
  useEffect(() => {
    const extractedUserId = getUserIdFromToken()
    setUserId(extractedUserId)
  }, [])

  // localStorage 변화 감지 (로그인/로그아웃 시)
  useEffect(() => {
    const handleStorageChange = () => {
      const extractedUserId = getUserIdFromToken()
      setUserId(extractedUserId)
    }

    // storage 이벤트 리스너 추가
    window.addEventListener('storage', handleStorageChange)

    // 같은 탭에서의 변경사항도 감지하기 위한 주기적 확인
    const intervalId = setInterval(() => {
      const currentUserId = getUserIdFromToken()
      if (currentUserId !== userId) {
        setUserId(currentUserId)
      }
    }, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(intervalId)
    }
  }, [userId])

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
    socketRef.current = io(BASE_URL)

    // 연결 성공
    // socketRef.current.on('connect', () => {
    //   console.log('Socket.IO 연결됨:', socketRef.current.id)
    // })

    // 스트리밍 메시지 시작 (선택적 - 이미 메시지 생성됨)
    socketRef.current.on('chat_response_start', () => {
      // console.log('백엔드에서 스트리밍 시작 신호 받음')
    })

    // 스트리밍 메시지 토큰 수신
    socketRef.current.on('chat_response_chunk', data => {
      // console.log('토큰 수신:', data.content)
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
      // console.log('스트리밍 완료:', data.content)
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
      // console.error('채팅 에러:', data.message)
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
      // console.log('Socket.IO 연결 해제됨')
    })

    // 연결 에러
    socketRef.current.on('connect_error', error => {
      // console.error('Socket.IO 연결 에러:', error)
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
    const token = localStorage.getItem('token')
    if (!token) return

    setIsLoadingChatRooms(true)
    try {
      const response = await fetch(`${BASE_URL}/api/chat/rooms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setChatRooms(data.chatRooms || [])
      // console.log('채팅방 불러오기 완료:', data.chatRooms)
    } catch (error) {
      // console.error('채팅방 불러오기 에러:', error)
    } finally {
      setIsLoadingChatRooms(false)
    }
  }, []) // userId 의존성 제거
  // 컴포넌트 마운트 시 채팅방 불러오기
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      loadChatRoomsFromDB()
    }
  }, [loadChatRoomsFromDB])

  // 토큰 변화 감지하여 채팅방 다시 불러오기
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && userId) {
      loadChatRoomsFromDB()
    } else if (!token) {
      setChatRooms([]) // 로그아웃 시 채팅방 목록 초기화
    }
  }, [userId, loadChatRoomsFromDB])

  // 채팅방을 DB에 저장하는 함수
  const saveChatToDB = useCallback(async chatData => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.warn('로그인된 사용자가 없습니다.')
      return
    }

    try {
      const response = await fetch(`${BASE_URL}/api/chat/insert-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chatroom_id: chatData.id,
          messages: chatData.messages,
          chatroom_title: chatData.title,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('채팅 저장 실패:', error)
      throw error
    }
  }, [])

  // 새로운 채팅방을 생성하는 함수
  const createNewChatRoom = useCallback(async messages => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.warn('로그인된 사용자가 없습니다.')
      return null
    }

    try {
      const response = await fetch(`${BASE_URL}/api/chat/create-room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title:
            messages.find(m => m.sender === 'user')?.text?.substring(0, 30) + '...' || '새 채팅',
          messages: messages,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result.chatroom_id
    } catch (error) {
      console.error('채팅방 생성 실패:', error)
      return null
    }
  }, [])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  // 채팅방 업데이트 함수
  const updateExistingChat = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token || messages.length <= 1) return

    // 현재 채팅방이 이미 저장된 채팅방인지 확인
    const existingChatRoom = chatRooms.find(room => room.id === currentChatId)
    if (!existingChatRoom) return

    try {
      const chatData = {
        id: currentChatId,
        title: existingChatRoom.title,
        messages: messages,
        createdAt: existingChatRoom.createdAt,
      }

      await saveChatToDB(chatData)

      // 로컬 상태 업데이트
      setChatRooms(prev => {
        const updatedRoom = {
          ...existingChatRoom,
          messages: messages,
          updatedAt: new Date(),
        }
        const otherRooms = prev.filter(room => room.id !== currentChatId)
        return [updatedRoom, ...otherRooms]
      })
    } catch (error) {
      console.error('채팅방 업데이트 실패:', error)
    }
  }, [currentChatId, messages, chatRooms, saveChatToDB])

  // 메시지 저장 로직
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || messages.length <= 1) return

    const saveMessages = async () => {
      // 사용자 메시지가 추가되었을 때
      const lastMessage = messages[messages.length - 1]
      if (lastMessage && lastMessage.sender === 'user') {
        const existingChatRoom = chatRooms.find(room => room.id === currentChatId)

        if (existingChatRoom) {
          // 기존 채팅방 업데이트
          const timer = setTimeout(() => {
            updateExistingChat()
          }, 500)
          return () => clearTimeout(timer)
        } else {
          // 새 채팅방 생성 (existingChatRoom이 없는 경우 항상 새로 생성)
          try {
            const newChatRoomId = await createNewChatRoom(messages)
            if (newChatRoomId) {
              setCurrentChatId(newChatRoomId)
              const chatData = {
                id: newChatRoomId,
                title: lastMessage.text.substring(0, 30) + '...',
                messages: messages,
                createdAt: new Date(),
              }
              setChatRooms(prev => [chatData, ...prev])
            }
          } catch (error) {
            console.error('새 채팅방 생성 실패:', error)
          }
        }
      }

      // 봇 메시지가 완성되었을 때
      const hasStreamingMessage = messages.some(msg => msg.isStreaming)
      if (!hasStreamingMessage) {
        const existingChatRoom = chatRooms.find(room => room.id === currentChatId)
        if (existingChatRoom) {
          const timer = setTimeout(() => {
            updateExistingChat()
          }, 200)
          return () => clearTimeout(timer)
        }
      }
    }

    saveMessages()
  }, [messages, updateExistingChat, currentChatId, chatRooms, createNewChatRoom])

  const sendToGPT = useCallback(async (message, currentMessages) => {
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
    // console.log('메시지 전송:', message)

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

    // 새로운 봇 메시지를 상태에 추가
    await new Promise(resolve => {
      setMessages(prev => {
        const newMessages = [...prev, initialBotMessage]
        resolve(newMessages)
        return newMessages
      })
    })

    // 대화 기록을 백엔드 형식에 맞게 변환
    const formattedMessages = currentMessages
      .filter(msg => !msg.isStreaming) // 스트리밍 중인 메시지 제외
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }))

    // Socket.IO로 메시지 전송
    socketRef.current.emit('chat_message', {
      message: message,
      messages: formattedMessages,
    })

    // console.log('Socket.IO 메시지 전송 완료')
  }, [])

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'user',
        text: inputMessage,
        timestamp: new Date(),
      }
      const messageToSend = inputMessage
      setInputMessage('')

      // 현재 메시지 목록을 가져오고 새 메시지를 추가
      let updatedMessages
      await new Promise(resolve => {
        setMessages(prev => {
          updatedMessages = [...prev, newMessage]
          resolve(updatedMessages)
          return updatedMessages
        })
      })

      // 업데이트된 메시지 목록과 함께 sendToGPT 호출
      await sendToGPT(messageToSend, updatedMessages)
    }
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const resetChat = async () => {
    const token = localStorage.getItem('token')
    // 로그인한 사용자이고, 현재 채팅이 기본 메시지보다 많고, 아직 저장되지 않은 새 채팅이면 저장
    if (token && messages.length > 1) {
      // 이미 저장된 채팅방인지 확인
      const isAlreadySaved = chatRooms.some(room => room.id === currentChatId)

      if (!isAlreadySaved && currentChatId !== 1) {
        try {
          // 새 채팅방 생성
          const newChatRoomId = await createNewChatRoom(messages)
          if (newChatRoomId) {
            const chatData = {
              id: newChatRoomId,
              title:
                messages.find(m => m.sender === 'user')?.text?.substring(0, 30) + '...' ||
                `채팅 ${newChatRoomId}`,
              messages: messages,
              createdAt: new Date(),
            }
            setChatRooms(prev => [chatData, ...prev])
          }
        } catch (error) {
          console.error('채팅 저장 실패:', error)
        }
      }
    }

    // 새 채팅 시작
    setCurrentChatId(1) // 새 채팅은 항상 ID 1로 시작
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

  // 마이페이지로 이동하는 함수
  const goToMyPage = () => {
    navigate('/mypage')
  }

  // isStreaming 메시지가 10초 이상 유지되면 자동으로 false로 만드는 안전장치
  useEffect(() => {
    const streamingMsg = messages.find(msg => msg.isStreaming)
    if (streamingMsg) {
      const timer = setTimeout(() => {
        setMessages(prev =>
          prev.map(msg => (msg.isStreaming ? { ...msg, isStreaming: false } : msg))
        )
      }, 10000) // 10초
      return () => clearTimeout(timer)
    }
  }, [messages])

  // 시간 포맷 함수
  const formatTime = date => {
    if (!date) return ''
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  }
  // <html>, <body> 태그만 제거, 맨 앞/뒤 <br> 태그도 제거
  function sanitizeHtml(html) {
    let sanitized = html.replace(/<\/?(html|body)[^>]*>/gi, '')
    // 맨 앞/뒤 <br> 태그 제거 (여러 개도 모두)
    sanitized = sanitized.replace(/^(<br\s*\/?>\s*)+/i, '')
    sanitized = sanitized.replace(/(<br\s*\/?>\s*)+$/i, '')
    return sanitized
  }

  // 채팅방 클릭 시 메시지를 로드하는 함수
  const handleChatRoomClick = useCallback(chatRoom => {
    // 메시지 로드 및 현재 채팅 ID 설정
    const sanitizedMessages = chatRoom.messages.map(msg => ({
      ...msg,
      isStreaming: false,
    }))
    setMessages(sanitizedMessages)
    setCurrentChatId(chatRoom.id)
  }, [])

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
                <div className="settings-icon" onClick={goToMyPage}>
                  <img src="/user.png" alt="사용자" />
                </div>
                <button className="back-icon" onClick={toggleSidebar}>
                  <FiChevronLeft className="toggle-arrow" />
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
                            className={`chat-room-item ${chatRoom.id === currentChatId ? 'selected' : ''}`}
                            onClick={() => handleChatRoomClick(chatRoom)}
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
                <FiChevronRight className="toggle-arrow" />
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
                  <div
                    className={`message-content ${message.isStreaming ? 'streaming' : ''}`}
                    dangerouslySetInnerHTML={{
                      __html: message.text
                        ? sanitizeHtml(message.text)
                        : message.isStreaming
                          ? ''
                          : '메시지를 불러오는 중...',
                    }}
                  />
                  <div className="message-time">{formatTime(message.timestamp)}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
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
