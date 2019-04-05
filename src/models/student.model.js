import mongoose from 'mongoose';

const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId }],
  department: { type: String },
});


// Export the model
module.exports = mongoose.model('Student', StudentSchema);
