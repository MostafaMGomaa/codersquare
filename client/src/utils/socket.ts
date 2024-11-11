import { io, Socket } from 'socket.io-client';
import { HOST } from '../api';

let socket: Socket | null;

export const initSocket = () => {
  const jwt = localStorage.getItem('jwt') as string;

  if (jwt && !socket) {
    socket = io(HOST, {
      auth: { token: jwt },
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
