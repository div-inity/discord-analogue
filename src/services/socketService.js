import { io } from 'socket.io-client';

let socket = null;

export function initSocket() {
  if (!socket) {
    socket = io('http://192.168.50.51:14545', {
      autoConnect: false,
      transports: ['websocket'],
      auth: {
        token: localStorage.getItem('token') || null
      }
    });
  }
  return socket;
};

export function useRawSocket() {
  if (!socket) {
    throw new Error('Socket not initialized. Call initSocket() first.');
  }
  return socket;
}
