const User = require("../model/users")
const cloudinary = require("../config/cloud")
const LoginHistory = require("../model/LoginHistory")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const Createuser = async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            status: "pending"
        });
        const doc = await user.save();
        res
            .status(201)
            .json({ message: "User  registered successfully", user: doc });
    } catch (error) {
        console.error("Error saving user:", error);
        if (error.code === 11000) {
            return res
                .status(400)
                .json({ message: "Username or email already exists." });
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

// Your user registration route

// app.get("/users",);

const Getusers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
// app.get("/employee", );
const Userroleemplyye = async (req, res) => {
    console.log(req.body)
    try {
        const employees = await User.find({ role: "employee" }); // Filter by role
        res.status(200).json({ employees });
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// app.patch("/users/:id",);
const PatchstatusUser = async (req, res) => {
    try {
        console.log("Request received:", req.body);
        const { id } = req.params;
        const { status } = req.body;

        if (!["Approved", "rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const user = await User.findByIdAndUpdate(id, { status }, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("Updated user:", user);
        res.json({ message: "Status updated successfully", user });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ error: "Error updating user status" });
    }
}
// app.patch("/usersrole/:id",);
const PatchroleUser = async (req, res) => {
    try {
        console.log("Request role received:", req.body);
        const { id } = req.params;
        const { role } = req.body;

        if (!["user", "employee", "admin"].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("Updated user:", user);
        res.json({ message: "role updated successfully", user });
    } catch (error) {
        console.error("Error updating role:", error);
        res.status(500).json({ error: "Error updating user role" });
    }
}
// app.delete("/users/:id", );
const Deleteuser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user first
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // If user has an image in Cloudinary, delete it
        if (user.image && user.image.public_id) {
            await cloudinary.uploader.destroy(user.image.public_id);
        }

        // Delete the user from the database
        await User.findByIdAndDelete(id);

        res.json({ message: "User and associated image deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Error deleting user" });
    }
};


// app.post("/api/approve_user", );

const Approveuser = async (req, res) => {
    try {
        const { userId, status } = req.body;
        if (!userId || !status) {
            return res
                .status(400)
                .json({ message: "User ID and status are required." });
        }

        const updatedUser = await User.updateOne({ _id: userId }, { status });

        if (updatedUser.nModified === 0) {
            return res
                .status(404)
                .json({ message: "User not found or no changes made." });
        }

        res.status(200).json({ message: "User status updated successfully." });
    } catch (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

// app.get('/login-history', authenticate, );
const GetloginHistory = async (req, res) => {
    console.log(req.body)
    try {
        const history = await LoginHistory
            .find({ userId: req.user.id })
            .sort({ loginTime: -1 })
            .populate('userId', 'email');
        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching login history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// app.post("/login", );
// const Loginuser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid email" });
//         }

//         // Special case for admin login
//         if (email === "admin@gmail.com" && password === "admin@123") {
//             const token = jwt.sign(
//                 { id: user._id, email: user.email, role: "admin" },
//                 JWT_SECRET_KEY,
//                 { expiresIn: "1h" }
//             );

//             return res.json({ message: "Admin login successful", token });
//         }
//         // General user logic
//         if (user.status !== "Approved") {
//             return res.status(403).send({ message: `Approval is ${user.status}` });
//         }

//         if (user.password !== password) {
//             return res.status(400).json({ message: "Invalid password" });
//         }

//         const token = jwt.sign(
//             { id: user._id, email: user.email },
//             JWT_SECRET_KEY,
//             { expiresIn: "1h" }
//         );
//         const logintime = await LoginHistory.create({
//             userId: user._id,
//             loginTime: new Date()
//         })
//         await logintime.save();
//         res.json({ message: "Login successful", token });
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// }
const Loginuser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Check if this is the hardcoded admin (optional - but not recommended for production)
        if (email === "admin@gmail.com") {
            if (password !== "admin@123") {
                return res.status(400).json({ message: "Invalid admin password" });
            }

            const token = jwt.sign(
                { id: user._id, email: user.email, role: "admin" },
                JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );

            return res.json({ message: "Admin login successful", token });
        }

        // General user logic
        if (user.status !== "Approved") {
            return res.status(403).json({ message: `Approval is ${user.status}` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        await LoginHistory.create({
            userId: user._id,
            loginTime: new Date()
        });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// app.get("/profile", authenticate,);
const Getuserprofile = async (req, res) => {
    try {
        const { email, username, phoneNo, profileImage } = req.body;

        const updates = {};
        if (email) updates.email = email;
        if (username) updates.username = username;
        if (phoneNo) updates.phoneNo = phoneNo;
        if (profileImage) updates.profileImage = profileImage;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        const userResponse = {
            id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            phoneNo: updatedUser.phoneNo,
            profileImage: updatedUser.profileImage,
            status: updatedUser.status,
            role: updatedUser.role,
        };

        res.json({ message: "Profile updated successfully.", user: userResponse });
    } catch (error) {
        console.error("Error updating profile:", error);

        if (error.code === 11000) {
            // Handle unique constraint errors (email)
            return res.status(400).json({ message: "Email must be unique." });
        }

        res.status(500).json({ message: "Internal server error." });
    }
}

//////////////////////////////////////////////   view couts

// app.put(
//     "/profile",
//     authenticate,
//     uploads.single("profileImage"),

// );

const Updateuserprofile = async (req, res) => {
    try {
        const { email, username, phoneNo } = req.body;
        const updates = {};
        if (email) updates.email = email;
        if (username) updates.username = username;
        if (phoneNo) updates.phoneNo = phoneNo;
        if (req.file) {
            updates.profileImage = req.file.path;
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Format user response
        const userResponse = {
            id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            phoneNo: updatedUser.phoneNo,
            profileImage: updatedUser.profileImage,
        };

        res.json({
            message: "Profile updated successfully.",
            user: userResponse,
        });
    } catch (error) {
        console.error("Error updating profile:", error);

        if (error.code === 11000) {
            return res.status(400).json({ message: "Email must be unique." });
        }

        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    Createuser,
    Getusers,
    Userroleemplyye,
    PatchstatusUser,
    PatchroleUser,
    Deleteuser,
    Approveuser,
    GetloginHistory,
    Loginuser,
    Getuserprofile,
    Updateuserprofile
}