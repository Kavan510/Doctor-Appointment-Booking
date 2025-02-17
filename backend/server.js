import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import adminRouter from './Routes/adminRoute.js';
import doctorRouter from './Routes/doctorRoute.js';
import userRouter from './Routes/userRoutes.js';

//app config 

const app = express();
const port = process.env.PORT || 3000
connectDB()
connectCloudinary()

//middlewares

app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
     res.send('api is working ')
})

 


app.listen(port,()=>{
    console.log("server is running on: "+port);
    
})
