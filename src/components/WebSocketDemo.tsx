import { useState } from 'react'
import { useWebSocket } from '../hooks/useWebSocket'

export default function WebSocketDemo() {
  const [input, setInput] = useState('')
  const { connected, messages, sendMessage } = useWebSocket('ws://localhost:3001')

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input)
      setInput('')
    }
  }

  const handleBroadcast = async () => {
    try {
      await fetch('http://localhost:3001/api/broadcast', {
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
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Bi-directional communication - Send and receive messages
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!connected}
            />
            <button
              onClick={handleSend}
              disabled={!connected || !input.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>

        <button
          onClick={handleBroadcast}
          disabled={!connected}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Send Broadcast to All Clients
        </button>

        <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
          <h3 className="font-semibold text-gray-700 mb-2">Messages:</h3>
          {messages.length === 0 ? (
            <p className="text-gray-400 text-sm">No messages yet...</p>
          ) : (
            <div className="space-y-2">
              {messages.map((msg, idx) => (
                <div key={idx} className="bg-white p-3 rounded border border-gray-200">
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      msg.type === 'connection' ? 'bg-green-100 text-green-800' :
                      msg.type === 'broadcast' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {msg.type}
                    </span>
                    {msg.timestamp && (
                      <span className="text-xs text-gray-500">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-800 mt-2">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
