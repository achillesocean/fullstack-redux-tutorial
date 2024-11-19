import startServer from "./src/server";
import makeStore from "./src/store";

export const store = makeStore();
startServer(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});

store.dispatch({type: 'NEXT'});