/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */

import Course from '../models/course.model';
import Student from '../models/student.model';


const query = async () => {
  try {
    const allCompSciCourse = await Course.find({ department: 'Computer Science' });
    const result = [];
    for (let i = 0; i < allCompSciCourse.length; i += 1) {
      result.push(await Student.find({ courses: allCompSciCourse[i]._id }));
    }
    console.log('***', result);
  } catch (err) {
    console.log('***Error executing query', err);
  }
};

query();
