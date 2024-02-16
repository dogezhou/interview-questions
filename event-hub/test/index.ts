import EventHub from "../src";

const eventHub = new EventHub();

eventHub.on('test', (data) => {
  console.log(data)
})
eventHub.emit('test', (data) => {
  console.log(data)
})