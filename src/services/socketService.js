// src/services/socketService.js
import { io } from 'socket.io-client'

let socket = null

export function initSocket() {
  if (!socket) {
    socket = io('http://localhost:3000', {
      autoConnect: false,
      transports: ['websocket'],
    })
  }
  return socket
}

export function useRawSocket() {
  if (!socket) {
    throw new Error('Socket not initialized. Call initSocket() first.')
  }
  return socket
}
