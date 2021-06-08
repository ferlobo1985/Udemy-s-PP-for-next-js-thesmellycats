import nc from 'next-connect';
import Newsletter from 'database/models/newsletter.model';
import connectToDb from 'database/db'

const handler = nc();

handler
.post( async(req,res)=>{
    await connectToDb();
    try{
        const email = await Newsletter.findOne({email:req.body.email});
        if(email){
            return res.status(400).json({message:'You are on the list, knock it out.'})
        }

        const newsletter = new Newsletter({
            email:req.body.email
        });
        await newsletter.save();
        res.status(200).json(newsletter);
    } catch(error){
        res.status(400).json({message:'Oop, something was wrong',error:error})
    }
});


export default handler;