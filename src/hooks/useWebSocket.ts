import { useState, useEffect, useRef } from 'react'

interface WebSocketMessage {
  type: 'connection' | 'echo' | 'broadcast'
  message: string
  timestamp?: string
}

export function useWebSocket(url: string) {
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState<WebSocketMessage[]>([])
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket(url)
    
    ws.onopen = () => {
      console.log('WebSocket connected')
      setConnected(true)
    }
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setMessages(prev => [data, ...prev])
    }
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
    
    ws.onclose = () => {
      console.log('WebSocket disconnected')
      setConnected(false)
    }
    
    wsRef.current = ws
    
    return () => {
      ws.close()
    }
  }, [url])

  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ message }))
    }
  }

  return { connected, messages, sendMessage }
}
