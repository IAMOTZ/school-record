import express from 'express';
import controllers from './controllers';

const router = express.Router();

router.post('/students', controllers.student.createStudent);

router.put('/students/:studentId', controllers.student.enrollStudent);

router.get('/students', controllers.student.getStudents);

router.post('/courses', controllers.course.createCourse);

router.get('/departments', controllers.department.getDepartments);

export default router;
