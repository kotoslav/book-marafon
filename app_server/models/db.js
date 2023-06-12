const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/book-marafon';
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});



process.once('SIGUSR2', () => {
    mongoose.connection.close().then(() => {
       console.log('SIGUSR2 signal received. Nodemon restart') ;
       process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    mongoose.connection.close(false).then(() => {
        process.exit(0);
    });
});


process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    mongoose.connection.close(false).then(() => {
        process.exit(0);
    });
});

require('./users');
require('./stages');
