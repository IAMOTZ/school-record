import Student from '../models/student.model';
import Course from '../models/course.model';

const getCourseIds = async (courseNames) => {
  const response = await Course.find({ name: courseNames });
  // eslint-disable-next-line no-underscore-dangle
  return response.map(res => res._id);
};

const enrollStudents = async (req, res) => {
  const { name, courses } = req.body;
  if (!name) {
    return res.status(401).send('Student name required to enroll student');
  }
  const courseArray = courses.split(',');
  const courseIds = await getCourseIds(courseArray) || [];
  if (courseIds.length !== courseArray.length) {
    return res.status(401).send('Some course names are not valid');
  }
  try {
    const student = new Student({ name, courses: courseIds });

    await student.save();
    return res.status(201).send('Student Enrolled');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error enrolling student');
  }
};

const listStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json({
      success: true,
      data: students,
    });
  } catch (err) {
    return res.status(500).send('Error fetching all students');
  }
};

export default {
  enrollStudents, listStudents,
};
