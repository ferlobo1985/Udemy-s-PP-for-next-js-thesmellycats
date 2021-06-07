import formidable from 'formidable';
import fs from 'fs';

export const config = {
    api:{
        bodyParser:false
    }
}


const saveFile = async(file) => {
    const data = fs.readFileSync(file.path);
    const newFileName = Date.now() + '-' + file.name;

    fs.writeFileSync(`./public/images/venues/${newFileName}`,data)
    fs.unlinkSync(file.path);
    return newFileName;
}


const Handler = async(req,res) => {
    if(req.method === 'POST'){
        const form = new formidable.IncomingForm();

        form.parse(req, async function(err,fields,files){
            try {
                const upload = await saveFile(files.file);
                return res.status(201).json({message:'ok',filename: upload})
            } catch(error){
                return res.status(400).json({errors:error})
            }
        })
    }
}

export default Handler;