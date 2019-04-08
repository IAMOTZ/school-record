import Course from '../models/course.model';
import Student from '../models/student.model';


export default async (req, res) => {
  try {
    const allCompSciCourse = await Course.find({ department: 'Computer Science' });
    // eslint-disable-next-line no-underscore-dangle
    const queryString = allCompSciCourse.map(course => ({ courses: course._id }));
    const result = await Student.find({ $or: queryString });
    // @TODO: I think I am supposed to get students
    // taking exactly one course from computer science dept.
    res.status(200).json({
      success: true,
      message: 'All students taking one course from computer science department',
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      success: true,
      message: 'Error getting all students taking one course from computer science department',
    });
  }
};
