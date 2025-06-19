import express from "express";
import { getCampaigns, createCampaign, updateCampaign, deleteCampaign } from "../controllers/campaign.controllers.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get('/', authMiddleware, getCampaigns);
router.post('/', authMiddleware, createCampaign);
router.put('/:id', authMiddleware, updateCampaign);
router.delete('/:id', authMiddleware, deleteCampaign);

export default router;