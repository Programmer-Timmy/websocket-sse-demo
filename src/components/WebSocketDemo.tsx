import { useState, useEffect, useRef } from 'react'
import { useWebSocket } from '../hooks/useWebSocket'
import { API_CONFIG, BROADCAST_URL } from '../config'

export default function WebSocketDemo() {
  const [input, setInput] = useState('')
  const [latency, setLatency] = useState<number | null>(null)
  const typingTimeoutRef = useRef<number | undefined>(undefined)
  const { connected, messages, sendMessage } = useWebSocket(API_CONFIG.WS_URL)

  useEffect(() => {
    // Check for pong messages to display latency (check first message as it's newest)
    const lastMessage = messages[0]
    if (lastMessage?.type === 'pong' && lastMessage.latency !== undefined) {
      setLatency(lastMessage.latency)
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input)
      setInput('')
    }
  }

  const handlePing = () => {
    sendMessage('Ping test', 'ping')
    setLatency(null) // Reset latency while waiting
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    
    // Throttle typing indicator - only send if not recently sent
    if (connected && value.length > 0) {
      if (!typingTimeoutRef.current) {
        sendMessage('User is typing...', 'typing')
      }
      
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      
      // Set new timeout to allow next typing indicator after 2 seconds
      typingTimeoutRef.current = setTimeout(() => {
        typingTimeoutRef.current = undefined
      }, 2000)
    }
  }

  const handleBroadcast = async () => {
    try {
      await fetch(BROADCAST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Broadcast message from UI!' })
      })
    } catch (error) {
      console.error('Broadcast error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">WebSocket</h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">
            {connected ? 'Connected' : 'Disconnected'}
          </span>
          {latency !== null && (
            <span className="text-xs text-green-600 font-mono bg-green-50 px-2 py-1 rounded">
              {latency}ms
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            💡 <strong>Real-time & Bi-directional:</strong> Instant messaging, live collaboration, typing indicators
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">
            Send messages and see instant responses
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={!connected}
            />
            <button
                onClick={handleSend}
                disabled={!connected || !input.trim()}
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>

        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePing}
            disabled={!connected}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
          >
            ⚡ Test Latency
          </button>
          <button
            onClick={handleBroadcast}
            disabled={!connected}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
          >
            📢 Broadcast to All
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
          <h3 className="font-semibold text-gray-700 mb-2">Messages:</h3>
          {messages.filter(msg => msg.type !== 'pong' && msg.type !== 'typing').length === 0 ? (
            <p className="text-gray-400 text-sm">No messages yet...</p>
          ) : (
            <div className="space-y-2">
              {messages.filter(msg => msg.type !== 'pong').map((msg, idx) => (
                <div key={idx} className={`bg-white p-3 rounded border ${
                  msg.fromSelf ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'
                }`}>
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      msg.type === 'connection' ? 'bg-green-100 text-green-800' :
                      msg.type === 'broadcast' ? 'bg-purple-100 text-purple-800' :
                      msg.type === 'user-joined' ? 'bg-teal-100 text-teal-800' :
                      msg.type === 'user-left' ? 'bg-orange-100 text-orange-800' :
                      msg.fromSelf ? 'bg-indigo-100 text-indigo-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {msg.fromSelf ? 'you' : msg.type === 'message' ? 'other user' : msg.type}
                    </span>
                    {msg.timestamp && (
                      <span className="text-xs text-gray-500">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-800 mt-2">{msg.message}</p>
                  {msg.clientCount && (
                    <p className="text-xs text-gray-500 mt-1">👥 {msg.clientCount} client(s) connected</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
