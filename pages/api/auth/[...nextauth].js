import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import connectToDb from 'database/db';

import { findUserByEmail } from 'database/services/user.service';
import { passwordCheck } from 'database/utils/tools';


export default NextAuth({
    session:{
        jwt:true
    },
    providers:[
        Providers.Credentials({
            async authorize(credentials){
                await connectToDb();
            
                //// check if user exists
                const user = await findUserByEmail(credentials.email);
                if(!user){
                    throw new Error('No email was found');
                }

                /// 
                if(!await passwordCheck(credentials.password, user.password )){
                    throw new Error('Wrong password');
                }

                return {
                    _id: user._id,
                    email: user.email,
                    role: user.role
                }
            }
        })
    ],
    callbacks:{
        async jwt(token,user){
            if(user?._id) token._id = user._id;
            if(user?.role) token.role = user.role;
            return token;
        },
        async session(session,token){
            if(token?._id) session.user._id = token._id;
            if(token?.role) session.user.role = token.role;
            return session;
        }
    }
})
