import mongoose from 'mongoose';

const { Schema } = mongoose;

const CourseSchema = new Schema({
  name: { type: String, required: true, max: 100 },
});


// Export the model
module.exports = mongoose.model('Course', CourseSchema);
