import express from 'express';
import requestHandlers from './requestHandlers';

const router = express.Router();

router.post('/enroll-student', requestHandlers.enrollStudent);

router.get('/list-students', requestHandlers.listStudents);

router.get('/list-departments', requestHandlers.listDepartments);

export default router;
