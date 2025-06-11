const TeamPage = require('../model/teampage');
const cloudinary = require('../config/cloud')
const addteam =async (req, res) => {
    try {
        const { name, post, linkedin, insta, facebook } = req.body;
        const imagePath = req.file.path;
        const newMember = new TeamPage({ name, post, linkedin, insta, facebook, image: imagePath });
        const savedMember = await newMember.save();
        res.status(200).json({ message: 'Team member created successfully', member: savedMember });
    } catch (error) {
        console.error('Error creating team member:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const getteam =async (req, res) => {
    try {
        const members = await TeamPage.find();
        res.status(200).json(members);
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const getbyidteam =async (req, res) => {
    try {
        const { id } = req.params;
        const member = await TeamPage.findById(id);
        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.status(200).json(member);
    } catch (error) {
        console.error('Error fetching team member:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const putteam = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (req.file) {
            updates.image = req.file.path;
        }
        const updatedMember = await TeamPage.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.status(200).json({ message: 'Team member updated successfully', member: updatedMember });
    } catch (error) {
        console.error('Error updating team member:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const deleteteam = async (req, res) => {
    try {
        const { id } = req.params;
        const teamMember = await TeamPage.findById(id);

        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        // Check if imageUrl exists
        if (teamMember.imageUrl) {
            const publicId = teamMember.imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        const deletedMember = await TeamPage.findByIdAndDelete(id);

        if (!deletedMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Error deleting team member:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    addteam,
    getteam,
    getbyidteam,
    putteam,
    deleteteam
}