const Course = require('../models/course.model');

// Create a new course (Admin Only)
exports.createCourse = async (req, res) => {
  try {
    const { title, price, description, features, instructor } = req.body;
    
    // Validate required fields
    if (!title || !price || !description) {
      return res.status(400).json({ error: 'Title, price, and description are required.' });
    }

    const course = new Course({
      title,
      price,
      description,
      features,       // Expecting an array of strings
      instructor,     // Optional field; defaults to "Unknown" if not provided
      createdBy: req.user.userId,
    });
    
    await course.save();
    
    return res.status(201).json({
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Get all courses (Public: so users can see them)
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return res.status(200).json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
