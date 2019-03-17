import socket from '@/api';
import * as types from '@/store/types';

export function init(player) {
  socket.send({ type: 'init', payload: player });
}

export function changeColor(id, color) {
  socket.send({ type: 'player:update', payload: { id, color } });
}

socket.addEventListener('message', (event) => {
  const { type, payload } = JSON.parse(event.data);

  if (type === 'players') socket.store.commit(types.SET_PLAYERS, payload);
  else if (type === 'players:self') socket.store.commit(types.SET_MYSELF, payload);
});
