const db = require('./connection');
const Joi = require('joi');

const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(500).required(),
    imageURL: Joi.string().uri({
        scheme: [
            /https?/
        ]
    }).allow(''),
});
// create a variable for the messages. This variable
// will be our way to access the messages in the database.
const messages = db.get('messages');

function getAll() {
    return messages.find();
}

function create(message) {
    if (!message.username) message.username = 'Anonymous';
    const result = Joi.validate(message, schema);
    if (result.error == null) { 
        message.created = new Date();
        return messages.insert(message);
    } else {
        return Promise.reject(result.error); 
    }
}

module.exports = {
    getAll,
    create
};