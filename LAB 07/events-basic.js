
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.emit('greet', 'Class');

emitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});