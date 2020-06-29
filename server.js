const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect database
connectDB();

//init Middlewares
app.use(express.json({extended: false}));

//routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));


app.get('/',(req, res)=>res.send('api is running'));



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`server is listening at PORT ${PORT}`)
})