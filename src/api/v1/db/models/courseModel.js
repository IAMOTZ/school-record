import mongoose from 'mongoose';
import BaseModel from './baseModel';

export default class CourseModel extends BaseModel {
  constructor(model) {
    super(mongoose);
    this.Model = model;
    this.getCourseWithName = this.getCourseWithName.bind(this);
    this.getCourseWithId = this.getCourseWithId.bind(this);
    this.createCourse = this.createCourse.bind(this);
  }

  async getCourseWithName(name) {
    const course = await this.Model.findOne({ name: new RegExp(name, 'i') });
    return course;
  }

  async getCourseWithId(id) {
    const course = await this.Model.findById(id);
    return course;
  }

  async createCourse(data) {
    const { name, departmentId } = data;
    const course = await new this.Model({ name, departmentId }).save();
    return course;
  }
}
