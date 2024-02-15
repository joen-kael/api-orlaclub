const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const port = process.env.PORT || 3001

const home = require('./src/home/router');
const api = require('./src/api/router');

app.use(helmet());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.json({limit: '6mb', strict: false}));
app.use(express.urlencoded({extended: false, limit: '6mb'}));
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', api)
app.use('/', withoutCSP, home)

app.listen(port, () => console.log('listening on port ' + port))

function withoutCSP(req, res, next) {
    res.header('content-security-policy', undefined);
    next();
}
