import { compare, hash } from 'bcryptjs';

export const passwordHash = async(password) => {
    const hashPassword = await hash(password,10);
    return hashPassword;
}
