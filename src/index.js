import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';


const store = createStore(rootReducer);

store.subscribe(() =>
  console.log(store.getState())
  );
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)



