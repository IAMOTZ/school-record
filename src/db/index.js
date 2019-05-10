import mongoose from 'mongoose';
import './setup';
import models from './models';
import schemas from './schemas';

// CommonJS require caching ensure these instantiation are all singleton.
const student = new models.StudentModel(mongoose.model('Student', schemas.studentSchema));
const course = new models.CourseModel(mongoose.model('Course', schemas.courseSchema));
const department = new models.DepartmentModel(mongoose.model('Department', schemas.departmentSchema));

export default {
  student, course, department,
};


/* A DB qury to get all students taking one courses from computer science department */
/*
const query = async () => {
  try {
    const department = await Department.findOne({ name: 'Computer Science' });
    const queryString = department.courses.map(courseId => ({ courses: courseId }));
    const result = await Student.find({ $or: queryString });
    console.log('Query Result: ', result);
  } catch (err) {
    console.log('Error executing query: ', err);
  }
};
*/
