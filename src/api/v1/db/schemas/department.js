import mongoose from 'mongoose';

const { Schema } = mongoose;

const LecturerSchema = new Schema({
  name: { type: String, required: true },
});

const DepartmentSchema = new Schema({
  name: { type: String, required: true },
  lecturers: [LecturerSchema],
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});


export default DepartmentSchema;
