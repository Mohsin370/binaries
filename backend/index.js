const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;;
const { sequelize } = require("./models");
// const auth = require('./routes/authentication/auth_route');
const routes = require('./routes/routes');


app.use(express.json({ limit: '50mb' }));
require("dotenv").config();





app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Content-Type,Authorization"
    );
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

app.get('/', (req, res) => {
    res.send('Test api call works!')
})

app.use('/api', routes);


process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
});


app.listen(PORT, async() => {
    console.log(process.env.PORT)
    await sequelize.authenticate().then((res) => {
        console.log("Authenticated");
        console.log("Server connected at port: ", PORT);
    });
});