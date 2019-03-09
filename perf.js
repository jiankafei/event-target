// 定义数据描述符
const dataDesc = (target, prop, value) => {
  if (!Reflect.defineProperty(target, prop, { value })) {
    console.warn(`${target} try to define a Data Descriptor "${prop}", but failed`);
  }
};
// 监听事件
dataDesc(EventTarget.prototype, 'on', function(type, callback) {
  this.addEventListener(type, callback);
});
// 移除事件
dataDesc(EventTarget.prototype, 'off', function(type, callback) {
  this.removeEventListener(type, callback);
});
// 触发事件
dataDesc(EventTarget.prototype, 'fire', function(type, detail, options) {
  if (detail || options) {
    options = Object.assign({
      bubbles: false,
      cancelable: true,
    }, options, {
      detail,
    });
    return this.dispatchEvent(new CustomEvent(type, options));
  } else {
    return this.dispatchEvent(new Event(type));
  }
});