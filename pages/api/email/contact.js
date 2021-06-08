import nc from 'next-connect';
import connectToDb from 'database/db'

const handler = nc()

handler
.post(async(res,res)=>{
    await connectToDb();
    try{
        

        res.status(200).json({success:true})
    } catch(error){
        res.status(400).json({message:'Try agaib later',error:error})
    }
})