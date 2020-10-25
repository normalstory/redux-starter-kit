//03. 비동기 처리내용 작성- post.js
import {handleAction, createAtion, handleActions} from 'redux-actions';
import {pender} from 'redux-pender';
import axios from 'axios'; 

function getPostAPI(postId){
    return axios.get('https://jsonplaceholder.typicode.com/posts/${postId}')
}
const GET_POST = 'GET_POST';
export const getPost = createAtion(GET_POST, getPostAPI);
const initialState={
    data:{title:'', body:''}
}

export default handleActions({
    ...pender({  //리듀서에서 pender로 비동기 작업 
        type:GET_POST,
        onSuccess: (state, action) => {
            const {title, body} = action.payload.data;
            return{
                data:{title, body}
            }
        }
    })
}, initialState);