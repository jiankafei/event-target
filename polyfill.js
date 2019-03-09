if (window.EventTarget) return;

const addInit = (listeners, type, callback) => {
  if (!Array.isArray(listeners[type])) listeners[type] = [];
  const queue = listeners[type];
  for (const fn of queue) {
    if (fn === callback) return;
  }
  return queue;
};

window.EventTarget = class EventTarget {
  get events() {
    return Object.keys(this._listeners);
  }
  constructor() {
    this._listeners = Object.create(null);
  }
  addEventListener(type, callback) {
    const queue = addInit(this._listeners, type, callback);
    queue && queue.push(callback);
    return true;
  }
  removeEventListener(type, callback) {
    const queue = this._listeners[type];
    if (!Array.isArray(queue)) return;
    if (callback) {
      for (let index = queue.length; index--;) {
        if (queue[index] === callback) {
          queue.splice(index, 1);
        }
      }
    } else {
      this._listeners[type] = [];
    }
    return true;
  }
  dispatchEvent(ev) {
    const queue = this._listeners[ev.type];
    if (!Array.isArray(queue)) return;
    ev.target = this;
    for (const fn of queue) {
      fn.call(this, ev);
    }
    return true;
  }
};