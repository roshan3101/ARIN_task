import Campaign from "../models/campaign.js";

const getCampaigns = async (req, res) => {
    try{
        const campaigns = await Campaign.findAll({ where: { userId: req.user.userId } });
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const createCampaign = async (req, res) => {
    try{
        const { name, date, impressions, clicks, conversions } = req.body;
        const campaign = await Campaign.create({ name, date, impressions, clicks, conversions, userId: req.user.userId });
        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateCampaign = async (req, res) => {
    try{
        const { id } = req.params;
        const campaign = await Campaign.findOne({ where: { id, userId: req.user.userId } });

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        await campaign.update(req.body);
        res.status(200).json({ message: 'Campaign updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteCampaign = async (req, res) => {
    try{
        const { id } = req.params;
        const campaign = await Campaign.findOne({ where: { id, userId: req.user.userId } });

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        await campaign.destroy();
        res.status(200).json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { getCampaigns, createCampaign, updateCampaign, deleteCampaign };