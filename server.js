const express = require('express');
const cors = require('cors');
const budget = require('./budget.json');
const path = require('path');
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const budgetModel = require("./models/budget_schema");
const dburl = 'mongodb://localhost:27017/budgetdb';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(dburl)
    .then(() => {
        console.log('accessed db')
        })
    .catch(err => {
        console.log('connection error: ', err)
    })

app.get('/budget', (req, res) => {
    budgetModel.find({})
        .then(data => {
            console.log('successfully gotten :)')
            res.json(data)
        })
        .catch(err => {
            console.log('get error: ', err)
        })
});

app.post('/budget', (req, res) => {
    const { title, amount, color } = req.body;

    if (!title || !amount || !color) {
        return res.status(400).json({ message: 'All fields (title, amount, color) are required!' });
    }

    const newData = new budgetModel({
        title,
        amount,
        color
    });

    newData.save()
        .then(data => {
            console.log('Successfully added :)');
            res.status(201).json(data);
        })
        .catch(err => {
            console.error('Post error: ', err);
            res.status(500).json({ message: 'Error adding budget data' });
        });
});


app.listen(port, () => {
    console.log(`API served @ http://localhost:${port}`)
});
