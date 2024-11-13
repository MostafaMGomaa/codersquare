import { io, Socket } from 'socket.io-client';
import { User } from '@codersquare/shared';
import { HOST } from '../api';

let socket: Socket | null;

export const initSocket = () => {
  const jwt = localStorage.getItem('jwt') as string;
  const user = JSON.parse(
    localStorage.getItem('user') as string,
  ) as Partial<User>;

  if (jwt && !socket) {
    socket = io(HOST, {
      auth: { token: jwt, userId: user.id },
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
