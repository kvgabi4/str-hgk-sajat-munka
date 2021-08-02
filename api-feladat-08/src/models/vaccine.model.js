const mongoose = require('mongoose');

const VaccineSchema = mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectID,
  name: String,
  efficiency: {
    type: Number,
    min: 1,
    max: 100,
    },
  }, {
    timeStamps: true
});

module.exports = mongoose.model('Vaccine', VaccineSchema);
