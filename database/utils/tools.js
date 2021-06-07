import { compare, hash } from 'bcryptjs';

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
