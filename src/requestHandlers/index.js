import student from './student';
import getDepartments from './getDepartments';
import './query';

export default {
  enrollStudent: student.enrollStudents,
  listStudents: student.listStudents,
  listDepartments: getDepartments,
};
