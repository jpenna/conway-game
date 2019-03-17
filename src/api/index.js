// ! Until I find how to initialize Websocket before starting tests with mocha
if (process.env.NODE_ENV === 'test') {
  global.WebSocket = class Websocket {
    send() {} // eslint-disable-line class-methods-use-this

    addEventListener() {} // eslint-disable-line class-methods-use-this
  };
}

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
