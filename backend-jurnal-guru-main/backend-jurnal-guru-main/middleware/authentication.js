import User  from '../models/user.js';
import { verifyToken } from '../helper/jwt.js';

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw { nama: 'Invalid Token' };
        } else {
            const [type, access_token] = authorization.split(' ');

            if (type !== 'Bearer') {
                throw { nama: 'Invalid Token' };
            }
            console.log(access_token,"<<<<<<<ACCESS TOKEN")
            console.log(verifyToken(access_token),"<<<<<<<<<<<<<<")
            const { id } = verifyToken(access_token);
            console.log(JSON.stringify(verifyToken(access_token)))
            if (!id) {
                throw { nama: 'AuthenticationFailed' };
            } else {
                const user = await User.findById(id);
                console.log(user?.role)
                if (!user) {
                    throw { nama: 'User Not Found' };
                } else {

                    req.user = {...req.user,
                        id: user._id,
                        nama: user.nama,
                        role: user.role,
                    };
                    next();
                }
            }
        }
    } catch (err) {
        next(err);
    }
};

export default authentication;