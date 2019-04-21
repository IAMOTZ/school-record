import Course from '../../models/course.model';
import helpers from './helpers';

const createCourse = async (req, res) => {
  const { name, departmentId } = req.body;
  const { department } = res.locals;
  try {
    const course = await new Course({ name, departmentId }).save();
    department.courses.push(course.id);
    await department.save();
    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'There was an error getting all departments',
    });
  }
};

const { validation } = helpers;
export default { createCourse: [...validation.createCourse, createCourse] };
