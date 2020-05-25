
// Core always have these
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// here

const morgan = require('morgan');

const messages = require('./db/messages')
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.json({
       message: 'Fullstack Message Board!'
   });
});

app.get('/messages', (req, res) => {
    messages.getAll().then((messagesData) => {
        res.json(messagesData);
    });
});

app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body).then((message) => {
        res.json(message);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

// Core always have these
const PORT = process.env.PORT || 8079;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
// here
