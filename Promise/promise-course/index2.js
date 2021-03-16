//极简版promise2
class PromiseP2 {
  callbacks = []
  state = 'pending'
  value = null
  constructor(fn) {
    //fn即是传入的函数
    /**
     * 给fn一个内部的_resolve函数参数，外部就可以调用这个_resolve，也就是new时传的resolve
     * 并且是bind了这个实例的this，可以调用这个实例里的callbacks任务队列
     *  */
    fn(this._resolve.bind(this))
  }
  /**
   * 给队列放入回调函数
   */
  then(onFulfilled) {
    if (this.state === 'pending') {
      this.callbacks.push(onFulfilled)
    } else {
      //resolve了的话，状态改变了就直接返回值
      onFulfilled(this.value)
    }

    return this //返回当前实例，方便链式调用，简单版
  }
  /**
   * new时resolve传入结果，再依次调用任务队列里的方法，任务队列里是.then时传入的函数
   */
  _resolve(value) {
    this.state = 'fulfilled' //改变状态
    this.value = value //存值
    this.callbacks.forEach((fn) => fn(value))
  }
}
export default PromiseP2
