const mongoose = require(`mongoose`);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Product must have a Name.`],
    trim: true,
  },
  description: {
    type: String,
    required: [true, `Product description is required.`],
  },
  price: {
    type: Number,
    required: [true, `Please enter product Price.`],
    max: [999999, `Price can't be more than 6 figures.`],
  },
  averageRating: {
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
    max: [9999, `Quantity cannot exceed over 9999.`],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: `User`,
        required: [true],
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      userImage: {
        public_id: {
          type: String,
          required: [true],
        },
        url: {
          type: String,
          required: [true],
        },
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
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: `User`,
    required: [true],
  },
  launchedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model(`Product`, productSchema);
