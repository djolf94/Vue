const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

User = require('./models/users');

//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

//get request to '/'
app.get('/', (req, res) => {
    res.send('Please use /api/books or /api/genres');
});

app.get('/api/users', (req, res) => {
    User.getUsers((err, users) => {
        if (err)
            throw err;
        res.json(users);
    });
});

app.post('/api/users', (req, res) => {
    var user = req.body;
    User.addUser(user,(err, user) => {
        if (err)
            throw err;
        res.json(user);
    });
});

app.get('/api/user/:_UserName', (req, res) => {
    User.getUserByUserName(req.params._UserName, (err, user) => {
        if (err)
            throw err;
        res.json(user);
    });
});

//Port on which app is running
app.listen(3000, () => {console.log('Listening on port 3000...')});