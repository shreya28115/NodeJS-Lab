const EventEmitter = require('events');

const app = new EventEmitter();

// Runs only once
app.once('firstLogin', (user) => {
    console.log(`Welcome bonus applied for ${user}!`);
});

// Runs every time
app.on('login', (user) => {
    console.log(`${user} logged in.`);
});

// Simulate multiple logins
app.emit('firstLogin', 'Aman');
app.emit('login', 'Aman');

app.emit('firstLogin', 'Aman');
app.emit('login', 'Aman');

app.emit('firstLogin', 'Aman');
app.emit('login', 'Aman');