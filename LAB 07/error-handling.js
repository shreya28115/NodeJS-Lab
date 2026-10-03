const EventEmitter = require('events');

const risky = new EventEmitter();

// Register error listener
risky.on('error', (err) => {
    console.log('Handled gracefully:', err.message);
});

// Emit the error
risky.emit('error', new Error('Something broke'));

console.log('Program continues running.');