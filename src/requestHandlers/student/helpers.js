import { body, validationResult } from 'express-validator/check';
import mongoose from 'mongoose';
import Student from '../../models/student.model';
import Course from '../../models/course.model';
import Department from '../../models/department.model';

const validation = {
  createStudent: [
    body('name', 'name is not valid')
      .isAlpha().isLength({ min: 2, max: 30 }), // Assume we are just taking first name alone
    body('departmentId', 'departmentId is not valid')
      .isString().custom(value => mongoose.Types.ObjectId.isValid(value)),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          messge: 'Invalid fields',
          errors: errors.array(),
        });
      }
      return next();
    },
    async (req, res, next) => {
      const { name, departmentId } = req.body;
      const student = await Student.findOne({ name: new RegExp(name, 'i') });
      if (student) {
        return res.status(400).json({
          success: false,
          message: 'Student with this name already exist',
        });
      }
      const department = await Department.findById(departmentId);
      if (!department) {
        return res.status(400).json({
          success: false,
          message: 'Chosen department does not exist',
        });
      }
      res.locals.department = department;
      return next();
    },
  ],
  enrollStudent: [
    body('studentId', 'studentId is not valid')
      .isString().custom(value => mongoose.Types.ObjectId.isValid(value)),
    body('courseId', 'courseId is not valid')
      .isString().custom(value => mongoose.Types.ObjectId.isValid(value)),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          messge: 'Invalid fields',
          errors: errors.array(),
        });
      }
      return next();
    },
    async (req, res, next) => {
      const { studentId, courseId } = req.body;
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(400).json({
          success: false,
          message: 'Student does not exist',
        });
      }
      const course = Course.findById(courseId);
      if (!course) {
        return res.status(400).json({
          success: false,
          message: 'Course does not exist',
        });
      }
      res.locals.student = student;
      return next();
    },
  ],
};

export default {
  validation,
};
