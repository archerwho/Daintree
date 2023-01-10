const mongoose = require(`mongoose`);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please must have a Name.`],
    trim: true,
  },
  description: {
    type: String,
    required: [true, `Product description is required.`],
  },
  price: {
    type: Number,
    required: [true, `Please enter product Price.`],
    maxLength: [8, `Price can't be more than 8 figures.`],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true],
      },
      url: {
        type: String,
        required: [true],
      },
    },
  ],
  category: {
    type: String,
    required: [true, `Please enter the Product Category.`],
  },
  stock: {
    type: Number,
    required: [true, `Quantity of the product is required.`],
    maxLength: [4, `Quantity cannot exceed over 1000.`],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  launchedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model(`Product`, productSchema);
