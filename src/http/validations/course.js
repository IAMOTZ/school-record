import { body, validationResult } from 'express-validator/check';
import db from '../../db';
import utils from '../../utils';

const { logger } = utils;

const validation = {
  createCourse: [
    body('name', 'name is not valid').isAlphanumeric().isLength({ min: 2, max: 25 }),
    body('departmentId', 'departmentId is not valid')
      .isString().custom(db.course.validateDatabaseID),
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
      try {
        const { name, departmentId } = req.body;
        const course = await db.course.getCourseWithName(name);
        logger.info('Checking if a course with the given name already exist');
        if (course) {
          return res.status(400).json({
            success: false,
            message: 'Course with this name already exist',
          });
        }
        const department = await db.department.getDepartmentWithID(departmentId);
        logger.info('Checking if the given department exist');
        if (!department) {
          return res.status(400).json({
            success: false,
            message: 'Department does not exist',
          });
        }
        res.locals.department = department;
        return next();
      } catch (err) {
        logger.error('Error validating course details: ', err);
        return res.status(500).json({ success: false, message: 'Error creating course' });
      }
    },
  ],
};

export default validation;
