const ValuedClient = require('../model/valuableclient');
const cloudinary = require('../config/cloud')
const addvaluedclients = async (req, res) => {
    try {
        const { name } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }
        const imagePath = req.file.path;
        const client = new ValuedClient({ name, image: imagePath });
        const savedClient = await client.save();
        res.status(200).json({
            message: 'Client created successfully',
            client: savedClient,
        });
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const getvaluedclients = async (req, res) => {
    try {
        const clients = await ValuedClient.find();
        res.status(200).json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const putvaluedclients = async (req, res) => {
    try {
        const { _id } = req.params;
        const updates = req.body;
        if (req.file) {
            updates.image = req.file.path;
        }
        const updatedClient = await ValuedClient.findByIdAndUpdate(_id, updates, { new: true });
        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ message: 'Client updated successfully', client: updatedClient });
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const deletevaluedclients = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClient = await ValuedClient.findById(id);
        if (!deletedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        const publicId = deletedClient.imageUrl.split('/').pop().split('.')[0];

        await cloudinary.uploader.destroy(publicId)
        const deletedMember = await ValuedClient.findByIdAndDelete(id);
        if (!deletedMember) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = {
    addvaluedclients,
    getvaluedclients,
    putvaluedclients,
    deletevaluedclients,
}