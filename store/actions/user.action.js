import * as type from '../types';
import { successDispatcher , errorDispatcher } from './notifications.action';
import { signIn, signOut } from 'next-auth/client'

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



export const registerUser = (values, data, router ) => {
    return async(dispatch)=>{

        const result = await signIn('credentials',{
            redirect:false,
            email: values.email,
            password: values.password
        });

        if(result.error){
            dispatch(errorDispatcher(result.error))
        } else {
            dispatch(successDispatcher('Welcome'))
            dispatch({
                type:type.SIGN_IN,
                payload:{
                    data:data.user,
                    auth:true
                }
            });
            router.push('/users/dashboard');
        }
    }
}
