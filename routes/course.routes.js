const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses } = require('../controllers/course.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

// Admin-only route to create a course
router.post('/', verifyToken, allowRoles('admin'), createCourse);

// Public route to get all courses
router.get('/', getAllCourses);

module.exports = router;
