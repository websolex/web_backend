const SocialDetails = require("../model/social");

const addsocial = async (req, res) => {
  try {
    const { facebook, whatsapp, instagram, linkedin } = req.body;
    const socialDetails = new SocialDetails({
      facebook,
      whatsapp,
      instagram,
      linkedin,
    });
    const savedSocialDetails = await socialDetails.save();
    res.status(200).json({
      message: "Social details created successfully",
      socialDetails: savedSocialDetails,
    });
  } catch (error) {
    console.error("Error creating social details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getsocial = async (req, res) => {
  try {
    const socialDetails = await SocialDetails.find();
    res.status(200).json(socialDetails);
  } catch (error) {
    console.error("Error fetching social details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const putsocial = async (req, res) => {
  try {
    const { id, facebook, whatsapp, instagram, linkedin } = req.body;
    if (!id) {
      return res.status(400).json({ message: "ID is required for updating" });
    }
    const updatedData = { facebook, whatsapp, instagram, linkedin };
    const updatedSocialDetails = await SocialDetails.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedSocialDetails) {
      return res.status(404).json({ message: "Social details not found" });
    }
    res.status(200).json({
      message: "Social details updated successfully",
      socialDetails: updatedSocialDetails,
    });
  } catch (error) {
    console.error("Error updating social details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  addsocial,
  getsocial,
  putsocial,
};
