require('dotenv').config()
require('express-async-errors')
const express=require('express');
const app=express();
const notFoundMiddleware=require('./middleware/not-found');
const errorMiddleware=require('./middleware/error-handler');
const connectDb = require('./db/connect')
const productRouter=require('./routes/products');



app.use(express.json());



app.use('/api/v1/products',productRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port=3000

const start=async()=>{
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(port,console.log('Server is listening on port 3000'))
    }catch(error){
        console.log(error)
    }
}

start()



