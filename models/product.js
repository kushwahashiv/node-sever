const mongoose = require('mongoose');  
const productSchema = new mongoose.Schema({  
  name: String,
  price: Number,
  dob: { type: Date, default: Date.now }
});
mongoose.model('Product', productSchema);
