const ContactDetails = require('../model/contactdetails');

const postcontectdetails = async (req, res) => {
    try {
        const { address, phoneno, avaliablity, email } = req.body;
        const contactDetails = new ContactDetails({ address, phoneno, avaliablity, email });
        const savedContactDetails = await contactDetails.save();
        res.status(200).json({
            message: 'Contact details created successfully',
            contactDetails: savedContactDetails,
        });
    } catch (error) {
        console.error('Error creating contact details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const getcontectdetails = async (req, res) => {
    try {
        const contactDetails = await ContactDetails.find();
        res.status(200).json(contactDetails);
    } catch (error) {
        console.error('Error fetching contact details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const putcontectdetails = async (req, res) => {
    try {
        const { id, address, phoneno, avaliablity, email } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'ID is required for updating' });
        }
        const updatedData = { address, phoneno, avaliablity, email };
        const updatedContactDetails = await ContactDetails.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedContactDetails) {
            return res.status(404).json({ message: 'Contact details not found' });
        }
        res.status(200).json({
            message: 'Contact details updated successfully',
            contactDetails: updatedContactDetails,
        });
    } catch (error) {
        console.error('Error updating contact details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    postcontectdetails,
    getcontectdetails,
    putcontectdetails,
}