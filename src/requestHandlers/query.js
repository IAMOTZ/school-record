/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */

import Course from '../models/course.model';
import Student from '../models/student.model';


const query = async () => {
  try {
    const allCompSciCourse = await Course.find({ department: 'Computer Science' });
    const queryString = allCompSciCourse.map(course => ({ courses: course._id }));
    const result = await Student.find({ $or: queryString });
    console.log('***', result);
  } catch (err) {
    console.log('***Error executing query', err);
  }
};

query();
