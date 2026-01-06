import './App.css'
import WebSocketDemo from './components/WebSocketDemo'
import SSEDemo from './components/SSEDemo'
import InfoSection from './components/InfoSection'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-6 md:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-2">
          WebSocket & SSE Demo
        </h1>
        <p className="text-sm sm:text-base text-center text-gray-600 mb-6 sm:mb-8">
          Real-time communication examples with Node.js backend
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <WebSocketDemo />
          <SSEDemo />
        </div>

        <InfoSection />
      </div>
    </div>
  )
}

export default App
