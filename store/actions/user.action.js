import * as type from '../types';
import { successDispatcher , errorDispatcher } from './notifications.action';

import axios from 'axios';

export const signInUser = (session,router) => {
    return async(dispatch)=>{
        try{
            const user = await axios.get('/api/users');
            dispatch(successDispatcher('Welcome back'));
            dispatch({
                type:type.SIGN_IN,
                payload:{
                    data:{
                        _id: session.user._id,
                        email:session.user.email,
                        role:session.user.role,
                        firstname: user.data.firstname,
                        lastname:  user.data.lastname,
                    },
                    auth:true
                }
            })
            router.push('/users/dashboard');
        }catch(error){
          dispatch(errorDispatcher('Something wrong'))
        }
    }
}