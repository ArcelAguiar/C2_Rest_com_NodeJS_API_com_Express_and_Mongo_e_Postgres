require('dotenv').config({
    path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
});

console.log(process.env.APP_NAME);


const express = require('express');
const sync = require('./infra/postgres').sincronizarPostgres;
const app = express();

const port = 3000;
const hostname = '0.0.0.0';

(async () => await sync())() // Sincroniza meu Postgres

const defaultRoutes = require('./routes/default-routes');
const peoplesRoutes = require('./routes/peoples-routes');
const peoplesRoutesPg = require('./routes/peoples-routes-pg');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use('/', defaultRoutes);
app.use('/api/peoples/', peoplesRoutes);
app.use('/api/peoplespg/', peoplesRoutesPg)


app.listen(port, hostname, () => {
    console.log(`Servidor rodando no endereço: https://${hostname}:${port}`);
});