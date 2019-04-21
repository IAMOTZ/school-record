import Department from '../models/department.model';
import Student from '../models/student.model';


export default async (req, res) => {
  try {
    const department = await Department.findOne({ name: 'Computer Science' });
    const queryString = department.courses.map(courseId => ({ courses: courseId }));
    const result = await Student.find({ $or: queryString });
    res.status(200).json({
      success: true,
      message: 'All students taking courses from computer science department',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Error getting all students taking one course from computer science department',
    });
  }
};
