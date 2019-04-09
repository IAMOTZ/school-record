import express from 'express';
import requestHandlers from './requestHandlers';

const router = express.Router();

router.post('/create-student', requestHandlers.createStudent);

router.post('/enroll-student', requestHandlers.enrollStudent);

router.get('/list-students', requestHandlers.listStudents);

router.post('/create-course', requestHandlers.createCourse);

router.get('/list-departments', requestHandlers.listDepartments);

router.get('/query', requestHandlers.query);

export default router;
