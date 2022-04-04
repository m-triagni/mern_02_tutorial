const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const { listAPI } = require('./listAPI')
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const testRoutes = require('./routes/test');
const categoryRoutes = require('./routes/category');
const linkRoutes = require('./routes/link');
 
// apply middlewares
app.use(morgan('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '5mb', type: 'application/json'}));

//set cors
//app.use(cors()) //apply this if API is allowed for all origin
app.use(cors({ origin: process.env.CLIENT_URL }))

//set DB
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true  })
.then( () => console.log('DB is connected'))
.catch( err => console.log(err) )

//set routes
app.use(listAPI.API, authRoutes);
app.use(listAPI.API, userRoutes);
app.use(listAPI.API, testRoutes);
app.use(listAPI.API, categoryRoutes)
app.use(listAPI.API, linkRoutes);

// start open the port to listen
const port = process.env.PORT ;
app.listen(port, () => console.log(`API is running on port ${port}.`));