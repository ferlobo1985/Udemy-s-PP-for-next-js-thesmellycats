import connectToDb from 'database/db';
import User from 'database/models/user.model';
import { passwordHash } from 'database/utils/tools'


import { userExists } from 'database/services/user.service';

const handler = async(req,res) => {
    await connectToDb();

    if(req.method === 'POST'){
        const {email, password} = req.body;

        /// check if user exists
        if(await userExists(email)){
            res.status(400).json({message:'User exists'});
            return;
        }

        /// hash password
        const hashedPass =  await passwordHash(password)

        try{



            res.status(200).json({email,hashedPass,ok:'ok'})
        } catch(error){

        }


     

    }


}


export default handler;