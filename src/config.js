import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    persistence: process.env.PERSISTENCE,
    mongodbURL: process.env.MONGODB_URL, 
    gitHubClientID: process.env.GITHUB_CLIENT_ID,
    gitHubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    gitHubCallbackURL: process.env.GITHUB_CALLBACK_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD
};


