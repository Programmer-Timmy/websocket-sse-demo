import { useServerSentEvents } from '../hooks/useServerSentEvents'

export default function SSEDemo() {
  const { connected, messages, connect, disconnect } = useServerSentEvents('http://play.timmygamer.nl:3100/api/events')

  const latestMetrics = messages.find(m => m.type === 'metrics')?.metrics
  const alerts = messages.filter(m => m.type === 'alert').slice(0, 3)

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
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-800">
            📊 <strong>Server Push & Auto-Reconnect:</strong> Live dashboards, monitoring, notifications
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">
            Receive continuous updates from server (simulated dashboard)
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

        {connected && latestMetrics && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="text-xs text-blue-600 font-semibold">Stock Price</div>
              <div className="text-2xl font-bold text-blue-900">${latestMetrics.stockPrice}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
              <div className="text-xs text-purple-600 font-semibold">Server Load</div>
              <div className="text-2xl font-bold text-purple-900">{latestMetrics.serverLoad}%</div>
            </div>
            <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
              <div className="text-xs text-teal-600 font-semibold">Active Users</div>
              <div className="text-2xl font-bold text-teal-900">{latestMetrics.activeUsers}</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
              <div className="text-xs text-orange-600 font-semibold">Memory</div>
              <div className="text-2xl font-bold text-orange-900">{latestMetrics.memoryUsage}%</div>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            ℹ️ Updates every 2s · Auto-reconnects if disconnected · HTTP-based (easy firewall pass-through)
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 h-40 overflow-y-auto">
          <h3 className="font-semibold text-gray-700 mb-2">Recent Alerts:</h3>
          {alerts.length === 0 ? (
            <p className="text-gray-400 text-sm">No alerts yet...</p>
          ) : (
            <div className="space-y-2">
              {alerts.map((msg, idx) => (
                <div key={idx} className={`p-2 rounded border text-sm ${
                  msg.severity === 'warning' 
                    ? 'bg-yellow-50 border-yellow-300 text-yellow-900'
                    : 'bg-blue-50 border-blue-300 text-blue-900'
                }`}>
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{msg.message}</span>
                    {msg.timestamp && (
                      <span className="text-xs opacity-75">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
