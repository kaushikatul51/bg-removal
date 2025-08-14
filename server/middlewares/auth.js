
import jwt from 'jsonwebtoken';

// Middleware to authenticate JWT tokens
const auth = async (req, res, next) => {
    try {
        const token= req.headers.token;
        if (!token) {
            return res.json({
                success: false,
                message: "Not authenticated, token missing"
            });
        }
        // Verify the token
        const token_decoded=jwt.decode(token)
        if (!token_decoded || !token_decoded.clerkId) {
            return res.json({
                success: false,
                message: "Not authenticated, invalid token"
            });
        }
        req.body.clerkId = token_decoded.clerkId;
        next();
        
    } catch (error) {
       
        res.json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
    next();
}

export default auth;

    