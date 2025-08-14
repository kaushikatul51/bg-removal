import { Webhook } from "svix"
import UserModel from "../models/userModels.js";
// api controller function to handle Clerk webhooks
//https://localhost:4000/api/user/webhooks
const clerkWebHooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]

        });
        const { data, type } = req.body;

        // Handle the webhook event based on its type
        switch (type) {
            case "user.created": {
                // Handle user creation event
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }
                await UserModel.create(userData);
                res.json({
                    success: true,
                    message: "User created successfully",
                    data: userData
                });

                break;

            }
            case "user.updated": {
                // Handle user update event
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }
                await UserModel.findOneAndUpdate({clerkId: data.id}, userData);
                res.json({})

                break;
            }
            case "user.deleted": {
                // Handle user deletion event
                await UserModel.findOneAndDelete({ clerkId: data.id });
                res.json({
                    
                });
                break;
            }
        }


    } catch (error) {
        console.error("Webhook verification failed:", error);
        res.json({
            success: false,
            message: "Webhook verification failed",
            error: error.message
        })

    }

}


const userCredits=async (req, res) => {
    try {
        const { clerkId } = req.body;
        const user = await UserModel.findOne({ clerkId });
        res.json({
            success: true,
            credits:user.creditBalance
        });
        
    } catch (error) {
         console.error(error.message);
        res.json({
            success: false,
            
            error: error.message
        })

        
    }


}
export {clerkWebHooks, userCredits};
