import mongoose from 'mongoose';

const newsletterSchema = mongoose.Schema({
    email:{
        required:[true,'The email is required'],
        type:String,
        unique:true   
    }
});


const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter',newsletterSchema);
export default Newsletter;