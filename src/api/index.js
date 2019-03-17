const socket = new WebSocket(`ws://${process.env.VUE_APP_WS_URL}`);

// Always send JSON
const sendOriginal = socket.send;
socket.send = function send(data) {
  sendOriginal.call(this, JSON.stringify(data));
};

socket.addEventListener('open', () => {
  socket.store.dispatch('initConnection');
});

export function setStore(instanceStore) {
  socket.store = instanceStore;
}

export default socket;
