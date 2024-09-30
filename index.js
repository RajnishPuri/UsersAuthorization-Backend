const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const Router = require('./Routes/authRoute');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5173'
}));

app.use(cookieParser());

const dbConnect = require('./config/database');

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/v1', Router);

app.get('/', (req, res) => {
    res.send(`
        <h1>Hello From Backend</h1>
    `);
});

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is Active on ${PORT}`);
});
