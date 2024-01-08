import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './RootReducer.js'
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(Reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );
  
