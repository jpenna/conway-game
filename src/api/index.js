const socket = new WebSocket(`ws://${process.env.VUE_APP_WS_URL}`);

// Always send JSON
const sendOriginal = socket.send;
socket.send = function send(data) {
  sendOriginal.call(this, JSON.stringify(data));
};

let store;

socket.addEventListener('open', () => {
  store.dispatch('game/connect');
});

// Listen for messages
socket.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  console.info('Message from server ', type, payload);
});

export function setStore(instanceStore) {
  store = instanceStore;
}

export default socket;
