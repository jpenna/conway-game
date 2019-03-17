import socket from '@/api';
import * as types from '@/store/types';

export function init(player) {
  socket.send({ type: 'init', payload: player });
}

socket.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  if (type !== 'players') return;

  socket.store.commit(types.SET_PLAYERS, payload);
});
