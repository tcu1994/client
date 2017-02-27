import axios from 'axios';
import { browserHistory } from 'react-router';
const ROOT_URL = 'http://localhost:3090';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';


export function signinUser({ email, password}){
    return function(dispatch) {
        // Submit email/pass to server
        axios.post(ROOT_URL+'/signin', { email, password })
            .then(response => {

                dispatch({ type: AUTH_USER});

                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(() => {
                dispatch(authError('Bad Login Info'));


            });
        // if request is good -> update state to indicate user is auth'd
        // 2) save token
        // 3) reditect to /feature
        // if bad -> show error
    }
}

export function signupUser({ email, password}){
    return function(dispatch) {
        axios.post(ROOT_URL+'/signup', { email, password})
            .then(response => {
                console.log(response);
                dispatch({ type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(response => {
                console.log(error);
                dispatch(authError(response.data.error))
            });
    }
}

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser(){
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    };
}

export function fetchMessage() {
    return function(dispatch){
        axios.get(ROOT_URL, { headers : { authorization: localStorage.getItem('token')}})
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.msg
                });
            });
    }
}