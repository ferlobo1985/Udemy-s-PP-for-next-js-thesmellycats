import * as type from '../types';

let DEFAULT_USER_STATE = {
    data:{
        _id:'',
        email:'',
        firstname:'',
        lastname:'',
        role:'user'
    },
    auth:false
}

export default function usersReducer(state=DEFAULT_USER_STATE,action){
    switch(action.type){
        default:
            return state;
    }
}