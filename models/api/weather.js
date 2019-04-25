const mongoose = require('mongoose')

const weatherSchema = mongoose.Schema({
  city: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  // author: String,
  // url: { type: String, required: true },
  // likes: Number,
})

weatherSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('weather', weatherSchema)