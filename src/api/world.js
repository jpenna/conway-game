import socket from '@/api';
import globalEvents from '@/utils/globalEvents';

export function signalStart() {
  socket.send({ type: 'game:start' });
}

export function signalStop() {
  socket.send({ type: 'game:stop' });
}

export function updateWorld(payload) {
  socket.send({ type: 'world:update', payload });
}

socket.addEventListener('message', (event) => {
  const { type, payload } = JSON.parse(event.data);

  if (type === 'world') globalEvents.emit('world:update', payload);
});
