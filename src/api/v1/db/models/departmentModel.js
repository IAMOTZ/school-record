import mongoose from 'mongoose';
import BaseModel from './baseModel';

export default class Department extends BaseModel {
  constructor(model) {
    super(mongoose);
    this.Model = model;
    this.getAllDepartments = this.getAllDepartments.bind(this);
    this.getDepartmentWithID = this.getDepartmentWithID.bind(this);
    this.getDepartmentWithName = this.getDepartmentWithName.bind(this);
    this.updateDepartment = this.updateDepartment.bind(this);
    this.createDepartment = this.createDepartment.bind(this);
  }

  async getAllDepartments(options) {
    const { includeStudents } = options;
    let departments;
    if (includeStudents) {
      departments = await this.Model.find().populate('students');
    } else {
      departments = await this.Model.find();
    }
    return departments;
  }

  async getDepartmentWithID(id) {
    const department = await this.Model.findById(id);
    return department;
  }

  async getDepartmentWithName(name) {
    const department = await this.Model.findOne({ name: new RegExp(name, 'i') });
    return department;
  }

  async updateDepartment(data) {
    const { departmentId, updateFields } = data;
    const department = await this.Model.findById(departmentId);
    Object.assign(department, updateFields);
    department.save();
    return department;
  }

  async createDepartment(data) {
    const { name, lecturers } = data;
    const department = await new this.Model({ name, lecturers }).save();
    return department;
  }
}
