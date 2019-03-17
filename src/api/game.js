import socket from '@/api';
import globalEvents from '@/utils/globalEvents';

export function signalStart() {
  socket.send({ type: 'game:start' });
}

export function signalStop() {
  socket.send({ type: 'game:stop' });
}

export function signalClear() {
  socket.send({ type: 'game:clear' });
}

socket.addEventListener('message', (event) => {
  const { type } = JSON.parse(event.data);

  if (type === 'game:start') globalEvents.emit('game:start');
  else if (type === 'game:stop') globalEvents.emit('game:stop');
  else if (type === 'game:reload') window.location.reload();
});
