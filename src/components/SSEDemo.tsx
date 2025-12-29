import { useServerSentEvents } from '../hooks/useServerSentEvents'

export default function SSEDemo() {
  const { connected, messages, connect, disconnect } = useServerSentEvents('http://localhost:3001/api/events')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Server-Sent Events</h2>
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
            One-way communication - Receive real-time updates from server
          </p>
          <div className="flex gap-2">
            <button
              onClick={connect}
              disabled={connected}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Connect
            </button>
            <button
              onClick={disconnect}
              disabled={!connected}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            ℹ️ Server sends automatic updates every 2 seconds when connected
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
          <h3 className="font-semibold text-gray-700 mb-2">Events:</h3>
          {messages.length === 0 ? (
            <p className="text-gray-400 text-sm">No events yet...</p>
          ) : (
            <div className="space-y-2">
              {messages.map((msg, idx) => (
                <div key={idx} className="bg-white p-3 rounded border border-gray-200">
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      msg.type === 'connection' ? 'bg-green-100 text-green-800' :
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
                  {msg.random !== undefined && (
                    <p className="text-xs text-gray-600 mt-1">Random value: {msg.random}</p>
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
