import { inject, onMounted, onBeforeUnmount } from 'vue';

export function useSocket(eventMap = {}) {
  const socket = inject('socket')
  if (!socket) {
    throw new Error('Socket is not provided. Did you register socketPlugin?');
  }

  onMounted(() => {
    if (!socket.connected) socket.connect()

    // eventMap: { 'eventName': handlerFn }
    Object.entries(eventMap).forEach(([event, handler]) => {
      socket.on(event, handler);
    });
  });

  onBeforeUnmount(() => {
    Object.entries(eventMap).forEach(([event, handler]) => {
      socket.off(event, handler);
    });
  });

  // возвращаем сам сокет, чтобы можно было emit'ить
  return {
    socket,
  }
}
