/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
import Department from '../models/department.model';
import Student from '../models/student.model';
import Lecturer from '../models/lecturer.model';

const getLecturers = async (departmentName) => {
  const lecturers = await Lecturer.find({ department: departmentName });
  return lecturers;
};

const getStudents = async (departmentName) => {
  const students = await Student.find({ department: departmentName });
  return students;
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    for (let i = 0; i < departments.length; i += 1) {
      // eslint-disable-next-line no-underscore-dangle
      const department = departments[i]._doc;
      const [lecturers, students] = await Promise.all(
        [getLecturers(department.name), getStudents(department.name)],
      );
      department.lecturers = lecturers;
      department.students = students;
    }
    return res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (err) {
    return res.status(500).send('There was an error getting all departments');
  }
};

export default getDepartments;
