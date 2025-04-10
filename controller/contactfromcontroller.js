const contactfromModel = require('../model/contactme');
const { contactEmail } = require('../config/sendmail')
// app.post("/contactform", );
const contactpost = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, contactnumber, subject, message } = req.body;
        if (!name || !email || !contactnumber || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const contact = new contactfromModel({
            name,
            email,
            contactnumber,
            subject,
            message,
        });
        const doc = await contact.save();
        contactEmail(name, email, contactnumber, subject, message);
        res.status(201).json({ message: "Form submitted successfully", data: doc });
    } catch (error) {
        console.error("Error saving form:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// GET Endpoint
// app.get("/view_contactform",);
const contactget = async (req, res) => {
    console.log(req.body);
    try {
        const view_contactform = await contactfromModel.find();
        res.json(view_contactform);
    } catch (error) {
        console.error("Error fetching form:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    contactpost,
    contactget,
}