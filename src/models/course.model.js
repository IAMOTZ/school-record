import mongoose from 'mongoose';

const { Schema } = mongoose;

const CourseSchema = new Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
});


// Export the model
module.exports = mongoose.model('Course', CourseSchema);
