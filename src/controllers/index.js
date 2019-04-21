import students from './students';
import courses from './courses';
import getDepartments from './departments';
import query from './query';

export default {
  createStudent: students.createStudent,
  enrollStudent: students.enrollStudent,
  getStudents: students.getStudents,
  createCourse: courses.createCourse,
  getDepartments,
  query,
};
