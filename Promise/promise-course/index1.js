// const STATUS = {
//   PENDING: 'pending',
//   FULFILLED: 'fulfilled',
//   REJECTED: 'reject'
// }
//极简版promise1
class PromiseP1 {
  callbacks = []
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
    this.callbacks.push(onFulfilled)
    return this //返回当前实例，方便链式调用
  }
  /**
   * new时resolve传入结果，再依次调用任务队列里的方法，任务队列里是.then时传入的函数
   */
  _resolve(value) {
    setTimeout(() => {
      this.callbacks.forEach((fn) => fn(value))
    })
  }
}
//没有状态机制，resolve后的then就不会再执行了。
export default PromiseP1
