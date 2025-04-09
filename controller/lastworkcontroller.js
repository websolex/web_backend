const LastWork = require("../model/lastworkadded");

const postourwork = async (req, res) => {
  try {
    const { name, description, business, rate } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const imagePath = req.file.path;
    const lastWork = new LastWork({
      name,
      description,
      business,
      rate,
      image: imagePath,
    });
    const savedLastWork = await lastWork.save();
    res.status(200).json({
      message: "Last work created successfully",
      type: "success",
      lastWork: savedLastWork,
    });
  } catch (error) {
    console.error("Error creating last work:", error);
    res.status(500).json({ message: "Internal Server Error", type: "error", });
  }
};

const getourwork = async (req, res) => {
  try {
    const lastWorks = await LastWork.find();
    res.status(200).json(lastWorks);
  } catch (error) {
    console.error("Error fetching last works:", error);
    res.status(500).json({ message: "Internal Server Error", type: "error", });
  }
};

const updateourwork = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
      updates.image = req.file.path;
    }
    const updatedLastWork = await LastWork.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedLastWork) {
      return res.status(404).json({ message: "Last work not found" });
    }
    res
      .status(200)
      .json({
        message: "Last work updated successfully",
        type:"success",
        lastWork: updatedLastWork,
      });
  } catch (error) {
    console.error("Error updating last work:", error);
    res.status(500).json({ message: "Internal Server Error", type: "error", });
  }
};

const deleteourwork = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the document to get the Cloudinary public ID
    const lastWork = await LastWork.findById(id);
    if (!lastWork) {
      return res.status(404).json({ message: "Last work not found" });
    }

    // Extract the public ID from the Cloudinary URL
    const publicId = lastWork.imageUrl.split("/").pop().split(".")[0];

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete the document from the database
    const deletedLastWork = await LastWork.findByIdAndDelete(id);
    if (!deletedLastWork) {
      return res.status(404).json({ message: "Last work not found" });
    }

    res.status(200).json({ message: "Last work deleted successfully", type: "success", });
  } catch (error) {
    console.error("Error deleting last work:", error);
    res.status(500).json({ message: "Internal Server Error", type: "error" });
  }
};

module.exports = {
  postourwork,
  getourwork,
  updateourwork,
  deleteourwork,
};
