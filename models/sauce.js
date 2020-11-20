// https://openclassrooms.com/en/courses/5614116-go-full-stack-with-node-js-express-and-mongodb/5656216-create-a-data-schema
// also examine: https://openclassrooms.com/en/courses/5614116-go-full-stack-with-node-js-express-and-mongodb/5656221-save-and-retrieve-data

const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Sauce', sauceSchema);