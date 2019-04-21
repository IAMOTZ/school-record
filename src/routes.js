import express from 'express';
import controllers from './controllers';

const router = express.Router();

router.post('/students', controllers.createStudent);

router.put('/students/:id', controllers.enrollStudent);

router.get('/students', controllers.getStudents);

router.post('/courses', controllers.createCourse);

router.get('/departments', controllers.getDepartments);

// The route below is just to demo the query that was included in the requirement specification.
router.get('/query', controllers.query);

export default router;
