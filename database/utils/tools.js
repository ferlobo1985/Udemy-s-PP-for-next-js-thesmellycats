import { compare, hash } from 'bcryptjs';
import roles from 'database/utils/roles';

export const passwordHash = async(password) => {
    const hashPassword = await hash(password,10);
    return hashPassword;
}

export const passwordCheck = async(password,hashedPassword)=>{
    const valid = await compare(password,hashedPassword);
    return valid;
}


export const validateBody = async(validation, data) => {
    try {
        await validation.validate(data,{ abortEarly:false});
        return true
    } catch(error){
        return false;
    }   
}

export const checkRole = async(req, rights)=>{
    const action = rights[0]; /// createANy, READANY
    const resource = rights[1] /// shows, profile, users

    console.log(req.session)
    
    const permission = roles.can(req.session.user.role)[action](resource);
    if(!permission.granted){
        return false
    }
    return true
}
