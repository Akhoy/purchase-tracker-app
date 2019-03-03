var EventEmitter = require('./node_modules/events')
 
let ee = new EventEmitter();

let event = {};

event.on = (eventName, listener) => ee.on(eventName, listener);

event.emit = (eventName, payload) => ee.emit(eventName, payload);

export default event;