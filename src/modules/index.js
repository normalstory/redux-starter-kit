//02. 라이브러리 안에 내장된 리듀서를 루트 리듀서에 이식 
import { combineReducers } from 'redux';
import counter from './counter';

import post from './post';
import {penderReducer} from 'redux-pender';

export default combineReducers({
    counter,
    post,
    pender: penderReducer
});