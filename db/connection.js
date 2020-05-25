const monk = require('monk');
const connectionString = 'mongodb+srv://TestUser:xAWVqfaJXfV3WXLT@dragalia-ria0s.mongodb.net/MessageBoard?retryWrites=true&w=majority';
const db = monk(connectionString);

module.exports = db;

