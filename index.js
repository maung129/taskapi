const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 3001;
const connectMongo = require('./db/connect');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/error-handler')
const tasksRoute = require('./routes/tasks');
const cors = require("cors");

app.use(cors());
app.use(express.json());



app.use('/api/tasks',tasksRoute);
app.use(notFound);
app.use(errorHandler);


const start = async() => {
    try{
        await connectMongo(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log('Server is listening at port '+PORT);
        })
    }
    catch(err){
        console.log(err);
    }
}

start();
