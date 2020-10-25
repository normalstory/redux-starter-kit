import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';
//import axios from 'axios';


class App extends Component {

    cancelRequest = null
    handleCancel = () => {
        if(this.cancelRequest){
            this.cancelRequest();
            this.cancelRequest=null;
        }
    }
    // loadData = () =>{
    //     const {PostActions, number} = this.props;
        // PostActions.getPost(number).then(
        //     (response) =>{
        //         console.log(response);
        //     }
        // ).catch(
        //     (error) => {
        //         console.log(error);
        //     }
        // );
        
    loadData = async() =>{
        const {PostActions, number} = this.props;
        try{ //ES7문법 
            const p = PostActions.getPost(number);
            this.cancelRequest = p.cancel;
            const response = await p;
            console.log(response);
        } catch(e) {
            console.log(e);
        }
    }
    componentDidMount(){
        this.loadData();
        //axios.get('https://jsonplaceholder.typicode.com/posts/1').then(response => console.log(response));
        window.addEventListener('keyup',(e)=>{
            if(e.key === 'Excape'){
                this.handleCancel();
            }
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.number !== prevProps.number){
            this.loadData();
        }
    }

    render() {
        const { CounterActions, number, post, error, loading } = this.props;
        return (
            <div>
                <h1>{number}</h1>
                {
                    (()=>{
                            if(loading)
                                return(<h2>로딩중 ..</h2>);
                            if(error)
                                return(<h2>오류 발생 ..</h2>)
                            return(
                                <div>
                                    <h2>{post.title}</h2>
                                    <p>{post.body}</p>
                                </div>
                            )
                        })()
                }
                <button onClick={CounterActions.increment}>+</button>
                <button onClick={CounterActions.decrement}>-</button>
                {/* <br></br>
                <button onClick={CounterActions.incrementAsync}>+ /1s</button>
                <button onClick={CounterActions.decrementAsync}>- /1s</button> */}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        number: state.counter,
        post:state.post.data,
        loading:state.pender.pending['GET_POST'],
        error: state.pender.failure['GET_POST']
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(App);