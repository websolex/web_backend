const Project = require('../model/projects')

const addproject = async (req, res) => {
    try {
        const { totalClients, completedProjects } = req.body;
        const project = new Project({ totalClients, completedProjects });
        const savedProject = await project.save();
        res.status(200).json({
            message: 'Project created successfully',
            type: "success",
            project: savedProject,
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Internal Server Error', type: "error", });
    }
}
const getproject = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
            projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Internal Server Error', type: "error", });
    }
}
const putproject = async (req, res) => {
    try {
        const { id } = req.params;
        const { totalClients, completedProjects } = req.body;
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { totalClients, completedProjects },
            { new: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({
            message: 'Project updated successfully',
            project: updatedProject
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = {
    addproject, getproject, putproject
}