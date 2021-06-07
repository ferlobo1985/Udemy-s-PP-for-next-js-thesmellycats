import formidable from 'formidable';

export const config = {
    api:{
        bodyParser:false
    }
}


const Handler = async(req,res) => {
    if(req.method === 'POST'){
        const form = new formidable.IncomingForm();

        form.parse(req, async function(err,fields,files){
            try {
                /// store files server
                console.log(files)
                console.log(files.file)

            } catch(error){
                return res.status(400).json({errors:error})
            }


        })


    }
}

export default Handler;