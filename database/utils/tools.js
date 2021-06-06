import { compare, hash } from 'bcryptjs';

export const passwordHash = async(password) => {
    const hashPassword = await hash(password,10);
    return hashPassword;
}

export const passwordCheck = async(password,hashedPassword)=>{
    const valid = await compare(password,hashedPassword);
    return valid;
}
