import mongoose from 'mongoose';

const { Schema } = mongoose;

const CourseSchema = new Schema({
  name: { type: String, required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
});

export default CourseSchema;
