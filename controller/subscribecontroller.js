const subscribeService = require('../controller/subscribecontroller');

// app.post("/subscribe", );
const postsubscribe = async (req, res) => {
    console.log(req.body);
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "email are required" });
        }
        const sub = new subscribeService({ email });
        const doc = await sub.save();
        res.status(201).json({ message: "Form submitted successfully", data: doc });
    } catch (error) {
        console.error("Error saving form:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// GET Endpoint
// app.get("/subscribe", );
const getsubscribe = async (req, res) => {
    try {
        const view_sub = await subscribeService.find();
        if (!view_sub) {
            return res.status(404).json({ message: "No subsriber found" });
        }
        res.json(view_sub);
    } catch (error) {
        console.error("Error fetching form:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    postsubscribe,
    getsubscribe,
}