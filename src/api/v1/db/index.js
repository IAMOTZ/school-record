import mongoose from 'mongoose';
import './setup';
import models from './models';
import schemas from './schemas';
import utils from '../../../utils';

// CommonJS require caching ensure these instantiation are all singleton.
const student = new models.StudentModel(mongoose.model('Student', schemas.studentSchema));
const course = new models.CourseModel(mongoose.model('Course', schemas.courseSchema));
const department = new models.DepartmentModel(mongoose.model('Department', schemas.departmentSchema));

const { logger } = utils;

const departments = [
  {
    name: 'Computer Science',
    lecturers: [
      { name: 'Tunmise' },
      { name: 'Osifo' },
    ],
  },
  {
    name: 'Bio Tech',
    lecturers: [
      { name: 'Demola' },
      { name: 'Seni' },
    ],
  },
];

const seedDepartment = async (dept) => {
  try {
    const { name, lecturers } = dept;
    const result = await department.getDepartmentWithName(name);
    if (!result) {
      await department.createDepartment({ name, lecturers });
      logger.info('Success seeding department: ', dept.name);
    } else {
      logger.info(dept.name, ' department already seeded.');
    }
  } catch (err) {
    logger.error('Error seeding department: ', dept.name, ' ', err);
  }
};

const seedArray = [];
departments.forEach(dept => seedArray.push(seedDepartment(dept)));
(async () => {
  await Promise.all(seedArray);
})();

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
