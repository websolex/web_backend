const BlogPage = require('../model/blogpage');

const postblog = async (req, res) => {
    console.log(req.body);
    try {
        const { name } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
        const imagePath = req.file.path;
        const content = [];
        for (
            let i = 1;
            req.body[`title${i}`] && req.body[`description${i}`];
            i++
        ) {
            content.push({
                title: req.body[`title${i}`],
                subtitle: req.body[`subtitle${i}`],
                description: req.body[`description${i}`],
            });
        }

        const blogadd = new blog({ name, content, image: imagePath });
        const savedblogadd = await blogadd.save();

        res.status(200).json({
            message: "Blog post created successfully",
            blogadd: savedblogadd,
        });
    } catch (error) {
        console.error("Error creating blog post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const getblogbyid = async (req, res) => {
    try {
        const { id } = req.params;

        const blogPost = await BlogPage.findById(id);

        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        res.status(200).json(blogPost);
    } catch (error) {
        console.error("Error fetching blog post by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getblog = async (req, res) => {
    try {
        const blogPosts = await BlogPage.find();
        res.status(200).json(blogPosts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const updateblog = async (req, res) => {
    console.log(req.body);
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updates = { name };
        const content = [];
        for (
            let i = 1;
            req.body[`title${i}`] && req.body[`description${i}`];
            i++
        ) {
            content.push({
                title: req.body[`title${i}`],
                description: req.body[`description${i}`],
            });
        }
        updates.content = content;

        if (req.file) {
            updates.image = req.file.path;
        }

        const updatedBlog = await blog.findByIdAndUpdate(id, updates, {
            new: true,
        });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res
            .status(200)
            .json({ message: "Blog post updated successfully", updatedBlog });
    } catch (error) {
        console.error("Error updating blog post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const deleteblog = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the blog post first
        const blogPost = await BlogPage.findById(id);

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // If the blog has an image, delete it from Cloudinary
        if (blogPost.image && blogPost.image.public_id) {
            await cloudinary.uploader.destroy(blogPost.image.public_id);
        }

        // Now delete the blog post from the database
        await BlogPage.findByIdAndDelete(id);

        res.status(200).json({ message: 'Blog post and image deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
module.exports = {
    postblog,
    getblog,
    updateblog,
    deleteblog,
    getblogbyid
}
