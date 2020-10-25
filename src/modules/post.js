//03. 비동기 처리내용 작성- post.js
import {handleActions, createAction} from 'redux-actions';
import {applyPenders} from 'redux-pender';
import axios from 'axios'; 

function getPostAPI(postId){
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

// const GET_POST_PENDING = 'GET_POST_PENDING';
// const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
// const GET_POST_FAILURE = 'GET_POST_FAILURE';

// const getPostPending = createAtion(GET_POST_PENDING);
// const getPostSuccess = createAtion(GET_POST_SUCCESS);
// const getPostFailure = createAtion(GET_POST_FAILURE);

const GET_POST = 'GET_POST';

export const getPost = createAction(GET_POST, getPostAPI);

const initialState={
    data:{
        title:'', 
        body:''
    }
}

// export default handleActions({
//     ...pender({  //리듀서에서 pender로 비동기 작업 
//         type:GET_POST,
//         onSuccess: (state, action) => {
//             const {title, body} = action.payload.data;
//             return{
//                 data:{title, body}
//             }
//         }
//     })
// }, initialState);

const reducer = handleActions({
    //다른 액션관리...
},initialState);

export default applyPenders(reducer, [
    {
        type: GET_POST,
        onSuccess: (state, action) =>{
            const {title, body} = action.payload.data;
            return{
                data: {
                    title, 
                    body
                }
            }
        },
        onCancel: (state, action) =>{
            return{
                data: {
                    title : '취소됨',
                    body : '취소됨'
                }
            }
        }
    },
    //다른 액션들 
    //{type: GET_SOMETHING, onSuccess: (state, action) => ...}
]);