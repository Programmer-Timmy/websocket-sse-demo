import { useState, useEffect, useRef } from 'react'

interface WebSocketMessage {
  type: 'connection' | 'message' | 'broadcast' | 'pong' | 'user-joined' | 'user-left' | 'typing'
  message: string
  timestamp?: string
  latency?: number
  clientCount?: number
  fromSelf?: boolean
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

  const sendMessage = (message: string, type: string = 'message') => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const payload: any = { message, type }
      if (type === 'ping') {
        payload.timestamp = Date.now()
      }
      wsRef.current.send(JSON.stringify(payload))
    }
  }

  return { connected, messages, sendMessage }
}
