
import jwt from 'jsonwebtoken';

// Middleware to authenticate JWT tokens
const auth = async (req, res, next) => {
    try {
        const {token}= req.headers;
        if (!token) {
            return res.json({
                success: false,
                message: "Not authenticated, token missing"
            });
        }
        // Verify the token
        const token_decoded=jwt.decode(token)
        req.body.clerkId = token_decoded.clerkId;
        next();
        
    } catch (error) {
        console.error("Authentication error:", error);
        res.json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
}

export default auth;

    