//01. 스토어에 pender 미들웨어 적용 

import { createStore, applyMiddleware } from 'redux';
import modules from './modules';

import {createLogger} from 'redux-logger';
import pendingMiddleware from 'redux-pender';

const logger = createLogger();
const store = createStore(modules, applyMiddleware(logger, pendingMiddleware()))

export default store;