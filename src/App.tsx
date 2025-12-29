import './App.css'
import WebSocketDemo from './components/WebSocketDemo'
import SSEDemo from './components/SSEDemo'
import InfoSection from './components/InfoSection'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-2">
          WebSocket & SSE Demo
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Real-time communication examples with Node.js backend
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <WebSocketDemo />
          <SSEDemo />
        </div>

        <InfoSection />
      </div>
    </div>
  )
}

export default App
