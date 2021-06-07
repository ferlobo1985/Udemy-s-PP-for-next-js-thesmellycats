import nc from 'next-connect';
import checkAuth from 'database/middleware/checkauth'
import connectToDb from 'database/db';

import { addShow } from 'database/services/show.service'


const handler = nc();


handler.post(
    "/api/shows/add_show",
    checkAuth,
    async(req,res)=>{
        try{
            await connectToDb();
            ///  permission
            const show = await addShow(req)
            res.status(200).json({show})
        }catch(error){
            res.status(400).json({message:error.message})
        }
    }
)


export default handler;