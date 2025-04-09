const ClientRate = require('../model/clientrate');
const cloudinary = require('../config/cloud');

const postclientrate = async (req, res) => {
    try {
        const { name, description, business, rate } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }
        const imagePath = req.file.path;
        const clientRate = new ClientRate({ name, description, business, rate, image: imagePath });
        const savedClientRate = await clientRate.save();
        res.status(200).json({
            message: 'Client rate created successfully',
            type:'success',
            clientRate: savedClientRate,
        });
    } catch (error) {
        console.error('Error creating client rate:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const getclientrate = async (req, res) => {
    try {
        const clientRates = await ClientRate.find();
        res.status(200).json(clientRates);
    } catch (error) {
        console.error('Error fetching client rates:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const putclientrate = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };
        if (req.file) {
            updates.image = req.file.path;
        }
        const updatedClientRate = await ClientRate.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedClientRate) {
            return res.status(404).json({ message: 'Client rate not found' });
        }
        res.status(200).json({ message: 'Client rate updated successfully', clientRate: updatedClientRate });
    } catch (error) {
        console.error('Error updating client rate:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deleteclientrate = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClientRate = await ClientRate.findByIdAndDelete(id);
        if (!deletedClientRate) {
            return res.status(404).json({ message: 'Client rate not found' });
        }
        if (deletedClientRate.image && deletedClientRate.image.public_id) {
            await cloudinary.uploader.destroy(deletedClientRate.image.public_id);
        }

        // Now delete the document from the database
        await ClientRate.findByIdAndDelete(id);
        res.status(200).json({ message: 'Client rate deleted successfully' });
    } catch (error) {
        console.error('Error deleting client rate:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = {
    postclientrate,
    getclientrate,
    putclientrate,
    deleteclientrate
}