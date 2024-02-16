export type EventFn = (data: unknown) => void;

class EventHub {
  private cache: { [k: string]: Array<EventFn> } = {};
  on(eventName: string, fn: EventFn) {
    if (this.cache[eventName]) {
      this.cache[eventName].push(fn);
    } else {
      this.cache[eventName] = [fn];
    }
  }
  emit(eventName: string, data?: unknown) {
    if (this.cache[eventName]) {
      this.cache[eventName].forEach((fn) => {
        fn(data);
      });
    }
  }
  off(eventName: string, fn: EventFn) {
    if (this.cache[eventName]) {
      this.cache[eventName] = this.cache[eventName].filter(
        (item) => item !== fn
      );
    }
  }
  once(eventName: string, fn: EventFn) {
    const onceFn: EventFn = (data) => {
      fn(data);
      this.off(eventName, onceFn);
    };
    this.on(eventName, onceFn);
  }
}

export default EventHub;
