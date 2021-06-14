import bcrypt from 'bcrypt';

import HttpException from '@/exceptions/HttpException';
import { User } from "@/interfaces/user.interface";
import DB from '@/databases';

class AuthService {
    public users = DB.Users;

    public async singup(userData): Promise<User> {
        const findUser: User = await this.users.findOne({ where: { email: userData.email } });
        if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const createUserData: User = await this.users.create({ ...userData, password: hashedPassword })
        return createUserData;
    }
}

export default AuthService;
