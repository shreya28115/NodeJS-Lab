const EventEmitter = require('events');

const orders = new EventEmitter();

// Listener 1: Kitchen
orders.on('placed', (item) => {
    console.log(`Kitchen: Prepare ${item}`);
});

// Listener 2: Billing
orders.on('placed', (item) => {
    console.log(`Billing: Charge for ${item}`);
});

// Listener 3: SMS
orders.on('placed', (item) => {
    console.log(`SMS: Order confirmed for ${item}`);
});

// Listener 4: Loyalty Points
orders.on('placed', (item) => {
    console.log(`Loyalty Points: Points added for ${item}`);
});

// Trigger the event
orders.emit('placed', 'Pizza');