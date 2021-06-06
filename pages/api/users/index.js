import nc from 'next-connect';
import connectToDb from 'database/db';

import checkAuth from 'database/middleware/checkauth';
import { findUserById } from 'database/services/user.service';

const handler = nc();

handler
.use(checkAuth)
.get(async(req,res)=>{
    try{
        const user = await findUserById(req.session.user._id)
        res.status(200).json(user);
    } catch(error){
        res.status(400).json({message:'Ops something wrong'});
    }
})
.patch(async(req,res)=>{

})


export default handler;