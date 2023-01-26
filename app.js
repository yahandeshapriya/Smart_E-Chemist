const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

const app = express()
const api = process.env.API_URL

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(morgan('dev'))

const drugRoutes = require('./routes/drugs')
const doctorRoutes = require('./routes/doctors')
const prescriptionRoutes = require('./routes/prescriptions')

app.use(`${api}/drugs`, drugRoutes)
app.use(`${api}/doctors`, doctorRoutes)
app.use(`${api}/prescriptions`, prescriptionRoutes)

app.use('/public', express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        app.listen(port, () => {
            console.log('App listening on port 3000 & database connection is ready');
        })
    })
    .catch((err) => {
        console.log(err);
    })


