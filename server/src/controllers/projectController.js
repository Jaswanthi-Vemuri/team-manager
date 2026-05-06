import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('members')
      .populate('createdBy');

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};