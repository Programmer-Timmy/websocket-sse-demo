import {useEffect, useRef, useState} from 'react'

// better to put interfaces in a separate file, but for a demo it's fine.
interface WebSocketMessage {
    type: 'connection' | 'message' | 'broadcast' | 'pong' | 'user-joined' | 'user-left' | 'typing'
    message: string
    timestamp?: string
    clientTimestamp?: number
    latency?: number
    clientCount?: number
    fromSelf?: boolean
}

interface WebSocketPayload {
    message: string
    type: string
    timestamp?: number
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
            if (data.type === 'pong' && data.clientTimestamp) {
                data.latency = Date.now() - data.clientTimestamp
            }
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
            const payload: WebSocketPayload = {message, type}
            if (type === 'ping') {
                payload.timestamp = Date.now()
            }
            wsRef.current.send(JSON.stringify(payload))
        }
    }

    // sending ping every 25 seconds to keep connection alive (typical WebSocket timeout) and to show latency (not required for SSE)
    useEffect(() => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const interval = setInterval(() => {
                sendMessage('Ping test', 'ping')
            }, 25000)
            return () => clearInterval(interval)
        }
    }, [connected])

    return {connected, messages, sendMessage}
}
