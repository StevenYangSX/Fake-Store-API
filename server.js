const express = require('express');

//initialize app
const app = express();


//add an endpoint
app.get('/', (req, res) => {
    res.send(res.json({
        msg: "Welcome to the fake store API"
    }))
})


//define all routes
app.use('/api/users', require('./routes/users'));
app.use('/api/items', require('./routes/items'));

//set port
const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, console.log("Server Started"));