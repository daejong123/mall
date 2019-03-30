import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import BaseRoute from './router/Router';
import { createStore } from 'redux';
import { loginReducer } from './store/reducer';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(loginReducer);

ReactDOM.render(
  <Provider store={store}>
    <BaseRoute />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
