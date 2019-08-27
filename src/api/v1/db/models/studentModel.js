import mongoose from 'mongoose';
import BaseModel from './baseModel';

export default class Student extends BaseModel {
  constructor(model) {
    super(mongoose);
    this.Model = model;
  }

  async createStudent(data) {
    const { name, departmentId } = data;
    const student = await new this.Model({ name, departmentId }).save();
    return student;
  }

  async getStudentWithName(name) {
    const student = await this.Model.findOne({ name: new RegExp(name, 'i') });
    return student;
  }

  async getStudentWithId(id) {
    const student = await this.Model.findById(id);
    return student;
  }

  async updateStudent(data) {
    const { studentId, updateFields } = data;
    const student = await this.Model.findById(studentId);
    Object.assign(student, updateFields);
    student.save();
    return student;
  }

  async getAllStudents(options) {
    const { includeCourses } = options;
    let students;
    if (includeCourses) {
      students = await this.Model.find().populate('courses');
    } else {
      students = await this.Model.find();
    }
    return students;
  }
}
