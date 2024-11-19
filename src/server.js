import { Server } from "socket.io";

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
    // You can subscribe to a Redux store. You do that by providing a function that the store will call after every action it applies, when the state has potentially changed. The result will be that a JSON-serialized snapshot of the state is sent over all active Socket.io connections.
  );

  io.on('connection', (socket) => {
    console.log('A client connected');
    // Our server should be able to let clients know about the current state of the application (i.e. "what is being voted on?", "What is the current tally of votes?", "Is there a winner yet?"). It can do so by emitting a Socket.io event to all connected clients whenever something changes.
    socket.emit('state', store.getState().toJS());
    
    socket.on('action', store.dispatch.bind(store));
  });
}

// state change in Redux => an action is dispatched to the Redux store
