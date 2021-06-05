import mongoose from 'mongoose';

export default async function connectToDb(){
    if(mongoose.connection.readyState >= 1) return;

    return mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rc4ay.mongodb.net/smellycats?retryWrites=true&w=majority`,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useFindAndModify:true,
        useCreateIndex:true
    });
}