import React, { useState, useEffect, useRef } from 'react'
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { ScrollArea } from "./ui/Scroll-Area"
import { Smile, Send, MessageCircle, X } from 'lucide-react'

const Message = ({ text, isBot, avatar }) => (
  <div className={`flex items-start gap-3 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
    <div className="flex items-start gap-3 max-w-[85%]">
      {isBot && (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={avatar} 
            alt="Bot Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div
        className={`${
          isBot ? 'bg-gray-100' : 'bg-[#00A651] text-white'
        } rounded-2xl py-2 px-4`}
      >
        <p className="text-sm">{text}</p>
      </div>
      {!isBot && (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={avatar} 
            alt="User Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  </div>
)

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef(null)
  const messagesEndRef = useRef(null)

  const botAvatar = "/bot.avif"
  const userAvatar = "/user.png"

  // Add initial welcome message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hello! I'm the USTC Chat Assistant. How can I help you today?",
          isBot: true
        }
      ])
    }
  }, [isOpen])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (inputMessage.trim() === '') return

    // Add user message
    const newMessages = [...messages, { text: inputMessage, isBot: false }]
    setMessages(newMessages)
    setInputMessage('')
    setIsTyping(true)

    try {
      // Add initial empty bot message
      setMessages(prevMessages => [...prevMessages, { text: '', isBot: true }])
      
      const response = await fetch("https://ec47-54-91-140-202.ngrok-free.app/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputMessage,
          temperature: 0.7,
          max_tokens: 512
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || 'Network response was not ok')
      }

      const data = await response.json()
      setIsTyping(false)

      // Update the last message with the complete response
      setMessages(prevMessages => {
        const newMessages = [...prevMessages]
        newMessages[newMessages.length - 1].text = data.answer
        return newMessages
      })

    } catch (error) {
      console.error('Error:', error)
      setIsTyping(false)
      setMessages(prevMessages => {
        // Remove the empty bot message if it exists
        const messages = prevMessages.filter(msg => msg.text !== '')
        return [
          ...messages,
          { 
            text: 'Sorry, there was an error processing your request. Please try again later.', 
            isBot: true 
          }
        ]
      })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-4 bottom-6 bg-[#00A651] text-white p-4 rounded-full shadow-lg hover:bg-[#008741] transition-all duration-300 ${isOpen && 'rotate-180'}`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 w-[450px] h-[450px] bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out animate-slide-up z-50">
          {/* Chat Header */}
          <div className="bg-[#00A651] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/ustc.jpeg" alt="USTC Logo" className="h-8 w-auto" />
              <h3 className="font-semibold">USTC Chat Support</h3>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="h-[calc(450px-8rem)]" ref={scrollAreaRef}>
            <div className="p-4">
              {messages.map((message, index) => (
                <Message 
                  key={index} 
                  text={message.text} 
                  isBot={message.isBot} 
                  avatar={message.isBot ? botAvatar : userAvatar}
                />
              ))}
              {isTyping && (
                <div className="flex items-start gap-3 mb-4 justify-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={botAvatar}
                      alt="Bot Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-gray-100 rounded-2xl py-2 px-4 max-w-[70%]">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="absolute bottom-0 left-0 right-0 border-t p-4 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                className="text-gray-500 hover:text-gray-600"
                disabled={isTyping}
              >
                <Smile className="h-5 w-5" />
              </Button>
              <Button 
                type="submit" 
                size="icon" 
                className="bg-[#00A651] hover:bg-[#008741] py-1 px-2 flex items-center justify-center"
                disabled={isTyping || !inputMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}