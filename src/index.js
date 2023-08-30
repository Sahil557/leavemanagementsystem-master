import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux';
import './index.css';
import App from './components/App/App';
import 'antd/dist/antd.css'; 
import * as serviceWorker from './serviceWorker';
const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
serviceWorker.unregister();
