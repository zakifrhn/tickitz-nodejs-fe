import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css'
import App from './router';

import Store from './store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import {Container} from './helpers/toast'
 
const persist = persistStore(Store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persist}>
        <App />
        <Container/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

