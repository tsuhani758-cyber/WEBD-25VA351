const EventEmitter = require('events');
class Button extends EventEmitter {}
const button = new Button();
button.on('click', () => {
  console.log('Button clicked!');
});
button.on('mouseover', () => {
  console.log('Mouse over button!');
});
button.emit('click');
button.emit('mouseover');