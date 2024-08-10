import User from '../models/user.js';
import { generateToken, verifyToken } from '../helper/jwt.js';
import { comparePassword, hashPassword } from '../helper/bcrypt.js';

class AuthController {
    static register = async (req, res, next) => {
        try {
            const { nama, username, password, role } = req.body;
            
            switch (true) {
                case !nama:
                    throw { msg: 'Name Is Empty' };
                case !username:
                    throw { msg: 'Username Is Empty' };
                case !password:
                    throw { msg: 'Password Is Empty' };
                case !role:
                    throw { msg: 'Role Is Empty' };
            }
            
            const checkUser = await User.findOne({ username:username });

            if (checkUser) {
                throw { msg: 'Username Already Exist' };
            }

            const user = await User.create({
                ...req.body,
                password: hashPassword(password),
                role: role.toLowerCase(),
            });
            return res.status(201).json({
                username: username,
                role: role,
            });
        } catch (err) {
            next(err);
        }
    };

    static login = async (req, res, next) => {
        try {
            const { username, password } = req.body;

            switch (true) {
                case !username:
                    throw { msg: 'Username Is Empty' };
                case !password:
                    throw { msg: 'Password Is Empty' };
                }
            const user = await User.findOne({ username:  username  });
            
            if (!user) {
                throw { msg: 'User Not Found' };
            }

            console.log(comparePassword( password,user.password));

            if (!user) {
                throw { msg: 'User Not Found' };
            } else {
                if (comparePassword(password,user.password)) {
                    console.log(user._id);
                    const access_token = generateToken({ id: user._id });
                    console.log(verifyToken(access_token),"<<<<<<<<<<<<<<");
                    return res.status(200).json({ access_token, role: user.role ,nama: user.nama});
                } else {
                    throw { msg: 'Invalid Password' };
                }
            }
        } catch (err) {
            next(err);
        }
    };
}

export default AuthController;
