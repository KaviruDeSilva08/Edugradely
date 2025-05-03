import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  role: {
    type: String,
    enum: ['teacher', 'student'],
    default: 'student',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists to prevent overwriting
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User; 