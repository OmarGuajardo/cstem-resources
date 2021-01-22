const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express()


dotenv.config();


//Connecting to Database
mongoose.connect(process.env.MONGO_DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
)
.then((result) => {
    console.log("DB Connected");
}).catch((err) => {
    console.log("Error when connecting to DB");
});

app.listen(3000, () => console.log("Server listening in 3000"))