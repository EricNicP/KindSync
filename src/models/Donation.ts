import mongoose, { Schema, model, models } from 'mongoose';

const DonationSchema = new Schema({
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    type: {
      type: String, // 'clothes', 'household', 'other'
      required: true,
    },
    description: String,
    quantity: String,
  }],
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'PICKED_UP', 'DISTRIBUTED', 'CANCELLED'],
    default: 'PENDING',
  },
  assignedNGO: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  pickupDetails: {
    address: String,
    scheduledTime: Date,
    contactPhone: String,
  },
  images: [String], // URLs to images
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Donation || model('Donation', DonationSchema);
