const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
    nome: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    idade: {
        type: mongoose.Schema.Types.Number,
        required: false
    },
    data_criacao: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    },
    data_alteracao: {
        type: mongoose.Schema.Types.Date,
        default: null
    }
});

let People = module.exports = mongoose.model('people', peopleSchema);

module.exports.get = function(callback, limit){
    People.find(callback).limit(limit);
}