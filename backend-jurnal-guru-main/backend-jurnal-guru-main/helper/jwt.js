import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

// Generate a JWT
export function generateToken(payload) {
    console.log(payload)
    return jwt.sign(payload, secret);
}

// Verify a JWT
export function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}
