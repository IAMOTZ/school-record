import { body, validationResult } from 'express-validator/check';
import mongoose from 'mongoose';
import Course from '../../models/course.model';
import Department from '../../models/department.model';

const validation = {
  createCourse: [
    body('name', 'name is not valid').isAlphanumeric().isLength({ min: 2, max: 25 }),
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
      const course = await Course.findOne({ name: new RegExp(name, 'i') });
      if (course) {
        return res.status(400).json({
          success: false,
          message: 'Course with this name already exist',
        });
      }
      const department = await Department.findById(departmentId);
      if (!department) {
        return res.status(400).json({
          success: false,
          message: 'Department does not exist',
        });
      }
      res.locals.department = department;
      return next();
    },
  ],
};

export default {
  validation,
};
