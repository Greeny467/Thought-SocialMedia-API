const { connect, connection } = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/thoughtSocialDB';

connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', () => {
  connection.close(() => {
    console.log('MongoDB connection terminated due to application exit');
    process.exit(0);
  });
});

module.exports = connection;
