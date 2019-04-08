import mongoose from 'mongoose';

const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: { type: String, required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

export default mongoose.model('Student', StudentSchema);
