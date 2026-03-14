import { initSocket } from '@/services/socketService';

export default {
  install(app) {
    const socket = initSocket();
    app.provide('socket', socket);
  },
}
