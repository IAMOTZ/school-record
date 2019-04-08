import Course from '../models/course.model';
import Department from '../models/department.model';


const createCourse = async (req, res) => {
  const { name, departmentId } = req.body;
  // @TODO Add validation here for name and departmentId
  try {
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(400).json({
        success: false,
        message: 'Department does not exist',
      });
    }
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

export default { createCourse };
