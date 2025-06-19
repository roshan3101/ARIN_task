import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./models/index.js";
import authRoutes from "./routes/auth.js";
import campaignRoutes from "./routes/campaign.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});