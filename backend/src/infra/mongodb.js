const mongoose = require('mongoose');

const strConnection = process.env.NODE_ENV !== 'development' ? `mongodb://${process.env.MONGO_USERNAME}:
${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?
authSource=admin` : `mongodb+srv://api:${process.env.MONGO_PASSWORD}@cluster0.h3wxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


// strConnection = `mongodb+srv://api:${process.env.MONGO_PASSWORD}@cluster0.h3wxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


mongoose.connect(strConnection, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no Mongo'));
db.once('open', function() {
    console.log("Banco de Dados Mongo conectado com sucesso");
});

module.exports = db;