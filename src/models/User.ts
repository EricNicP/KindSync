import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
  },
  role: {
    type: String,
    enum: ['DONOR', 'NGO', 'ADMIN'],
    default: 'DONOR',
  },
  phone: String,
  address: String,
  ngoDetails: {
    registrationNumber: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    description: String,
    website: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.User || model('User', UserSchema);
