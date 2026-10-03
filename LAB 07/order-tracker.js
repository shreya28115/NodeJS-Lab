const EventEmitter = require('events');

class OrderTracker extends EventEmitter {
    constructor() {
        super();
    }

    placeOrder(customer, item) {
        this.emit('orderPlaced', customer, item);
        this.emit('firstOrderBonus', customer);
    }

    prepareOrder(customer, item) {
        this.emit('orderPrepared', customer, item);
    }

    deliverOrder(customer, item) {
        this.emit('orderDelivered', customer, item);
    }
}

const tracker = new OrderTracker();

// Handle errors safely
tracker.on('error', (err) => {
    console.log('Order error handled:', err.message);
});

// Event 1: Order placed
tracker.on('orderPlaced', (customer, item) => {
    console.log(`Order placed: ${customer} ordered ${item}.`);
});

tracker.on('orderPlaced', (customer, item) => {
    console.log(`Notification: Order confirmation sent to ${customer}.`);
});

// Event 2: Order prepared
tracker.on('orderPrepared', (customer, item) => {
    console.log(`Kitchen: ${item} is ready for delivery.`);
});

tracker.on('orderPrepared', (customer, item) => {
    console.log(`Notification: ${customer}, your ${item} is prepared.`);
});

// Event 3: Order delivered
tracker.on('orderDelivered', (customer, item) => {
    console.log(`Delivery: ${item} delivered to ${customer}.`);
});

tracker.on('orderDelivered', (customer, item) => {
    console.log(`Notification: ${customer}, enjoy your order!`);
});

// First-order bonus: only once for this tracker instance
tracker.once('firstOrderBonus', (customer) => {
    console.log(`Bonus: First-order reward granted to ${customer}!`);
});

// Simulate the complete order lifecycle
console.log('--- Order Tracking Started ---');

tracker.placeOrder('Aman', 'Pizza');

setTimeout(() => {
    tracker.prepareOrder('Aman', 'Pizza');
}, 1000);

setTimeout(() => {
    tracker.deliverOrder('Aman', 'Pizza');
}, 2000);

setTimeout(() => {
    console.log('--- Order Tracking Completed ---');
}, 2500);