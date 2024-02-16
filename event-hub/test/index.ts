import EventHub, { EventFn } from "../src";

type TestCase = (message: string) => void;

const test1: TestCase = (message) => {
  const eventHub = new EventHub();
  const emmitData = "emmitData";
  let called = false;

  eventHub.on("testEvent", (data) => {
    called = true;
    console.assert(data === emmitData);
  });
  eventHub.emit("testEvent", emmitData);
  console.assert(called);
  console.log(message);
};

const test2: TestCase = (message) => {
  const eventHub = new EventHub();
  let called = false;
  const fn: EventFn = () => {
    called = true;
  };
  eventHub.on("testEvent", fn);
  eventHub.off("testEvent", fn);
  eventHub.emit("testEvent");
  console.assert(called === false);
  console.log(message);
};

const test3: TestCase = (message) => {
  const eventHub = new EventHub();
  const emmitData = "emmitData";
  let calledCount = 0;
  const fn: EventFn = (data) => {
    calledCount += 1;
    console.assert(data === emmitData);
  };
  eventHub.once("testEvent", fn);
  eventHub.emit("testEvent", emmitData);
  eventHub.emit("testEvent", emmitData);
  console.assert(calledCount === 1);
  console.log(message);
};

test1(".on 之后 .emit 会调用 .on 的函数");
test2(".off 之后 .emit 不会调用 .on 的函数");
test3(".once 之后 .emit只调用一次");
