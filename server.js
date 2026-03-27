require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const session =require('express-session');
const passport = require('passport');

const cors = require('cors');


const app = express();

const port = process.env.PORT || 3000

//Middleware
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false
}));

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/', require('./routes'));

const errorHandler = require('./middleware/errorHandler');

app.use(errorHandler);

//MongoDB connection (Mongoose)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

