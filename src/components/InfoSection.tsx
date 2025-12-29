export default function InfoSection() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">How it works</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-indigo-700 mb-2">WebSocket</h3>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Full-duplex communication channel</li>
            <li>Bi-directional data flow (client ↔ server)</li>
            <li>Perfect for chat apps, gaming, collaborative tools</li>
            <li>Maintains persistent connection</li>
            <li>Can send messages anytime from either side</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-green-700 mb-2">Server-Sent Events (SSE)</h3>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>One-way communication (server → client)</li>
            <li>Built on standard HTTP</li>
            <li>Automatic reconnection on disconnect</li>
            <li>Perfect for live feeds, notifications, dashboards</li>
            <li>Simpler than WebSocket for one-way updates</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
