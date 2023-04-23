const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/expensesRoutes');
const sequelize = require('./util/database');

const app = express()

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use(routes);

sequelize
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(err => console.error(err));