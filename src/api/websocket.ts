import { io, Socket } from 'socket.io-client';
import { getNewAccessToken } from './index'; // Importar la función que maneja la renovación del access token

let socket: Socket;
let token: string = '';
const API_URL = process.env.REACT_APP_API_URL;
export const connectSocket = async () => {
  if (!token) {
    await renewToken();
  }

  socket = io(`${API_URL}`, {
    query: { token },
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  socket.on('newMessage', (message: string) => {
    console.log('New message received:', message);
    // Aquí puedes manejar la recepción de nuevos mensajes y actualizarlos en la interfaz
  });
};

export const sendMessage = async (message: string) => {
  if (!socket) {
    await connectSocket(); // Asegurarse de que la conexión está establecida
  }

  socket.emit('message', message);
};

const renewToken = async () => {
  token = await getNewAccessToken(); // Usa la función de renovación de tokens
};
