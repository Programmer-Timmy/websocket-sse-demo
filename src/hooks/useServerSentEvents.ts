import { useState, useRef, useCallback } from 'react'

interface SSEMessage {
  type: 'connection' | 'update'
  message: string
  timestamp?: string
  random?: number
}

export function useServerSentEvents(url: string) {
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState<SSEMessage[]>([])
  const eventSourceRef = useRef<EventSource | null>(null)

  const connect = useCallback(() => {
    if (eventSourceRef.current) return
    
    const eventSource = new EventSource(url)
    
    eventSource.onopen = () => {
      console.log('SSE connected')
      setConnected(true)
    }
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setMessages(prev => [data, ...prev])
    }
    
    eventSource.onerror = (error) => {
      console.error('SSE error:', error)
      setConnected(false)
    }
    
    eventSourceRef.current = eventSource
  }, [url])

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      setConnected(false)
      eventSourceRef.current = null
    }
  }, [])

  return { connected, messages, connect, disconnect }
}
