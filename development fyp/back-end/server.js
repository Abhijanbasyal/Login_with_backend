const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./db/dbConnection');
const User = require('./db/user');
const cors = require('cors');

//middleware for parsing json
app.use(express.json());

//enable cors
app.use(cors())

//registration
app.post('/register', async (req, res) => {
    try {
        const {username,password} = req.body;
        console.log(req.body);
        const user = new User({username,password});
        await user.save();
        res.status(201).json({ message: 'Registration Successfully' });
    }
     catch (error) {
        res.status(500).json({ error});
    }
});

app.post('/login', async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username})

        if(!user){
            return res.status(401).json({error: "Invalid username"})
        }
        if(user.password !==  password){
            return res.status(401).json({error: "Invald PAssword"})
        }
        res.status(500).json({message: "login succesful"})
    }
    catch(error){
        res.status(500).json({error: "login failed"})
    }
})






//calling connectionDB
connectDB();

app.listen(port,()=>{
    console.log("Server is Listening on port 8000")
})

