const EventEmitter = require('events');

class NotificationCenter extends EventEmitter {
    constructor() {
        super();
    }
}

const notifier = new NotificationCenter();

// Listener for newMessage
notifier.on('newMessage', (from, text) => {
    console.log(`Message from ${from}: ${text}`);
});

// Listener for error
notifier.on('error', (err) => {
    console.log('Handled:', err.message);
});

// Custom event listener
notifier.on('userOnline', (username) => {
    console.log(`${username} is now online.`);
});

// Emit events
notifier.emit('newMessage', 'Priya', 'You are free?');

notifier.emit('userOnline', 'Priya');