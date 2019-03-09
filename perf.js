// 定义数据描述符
const dataDesc = (target, prop, value) => {
  if (!Reflect.defineProperty(target, prop, { value })) {
    console.warn(`${target} try to define a Data Descriptor "${prop}", but failed`);
  }
};
// 监听事件
dataDesc(EventTarget.prototype, 'on', EventTarget.prototype.addEventListener);
// 移除事件
dataDesc(EventTarget.prototype, 'off', EventTarget.prototype.removeEventListener);
// 触发事件
dataDesc(EventTarget.prototype, 'fire', function(type, detail = Object.create(null)) {
  this.dispatchEvent(new CustomEvent(type, {
    bubbles: false,
    cancelable: false,
    detail,
  }));
});