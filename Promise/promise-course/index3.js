//极简版promise3
class PromiseP3 {
  callbacks = []
  state = 'pending'
  value = null
  constructor(fn) {
    //fn即是传入的函数
    /**
     * 给fn一个内部的_resolve函数参数，外部就可以调用这个_resolve，也就是new时传的resolve
     * 并且是bind了这个实例的this，可以调用这个实例里的callbacks任务队列
     *  */
    fn(this._resolve.bind(this), this._reject.bind(this))
  }
  /**
   * 给队列放入回调函数，返回的是一个promise，再把当前的then的onFulfilled，和下一个promise
   * 一起处理
   */
  then(onFulfilled, onRejected) {
    return new PromiseP3((resolve, reject) => {
      this._handle({
        onFulfilled,
        onRejected,
        resolve,
        reject
      })
    })
  }
  //用catch直接调用then，只传err事件
  catch(onError) {
    return this.then(null, onError)
  }
  /**
   * 如果状态是pending，放入队列
   * 如果then的onFulfilled函数不存在，直接调用下一个promise的resolve，传当前的value，
   * 否则调用当前then的onFulfilled，再把返回值给下一个promise的resolve
   */
  _handle(callback) {
    if (this.state === 'pending') {
      this.callbacks.push(callback)
      return
    }
    let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
    if (!cb) {
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject
      cb(this.value)
      return
    }
    let ret
    try {
      ret = cb(this.value)
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject
    } catch (error) {
      ret = error
      cb = callback.reject
    } finally {
      cb(ret)
    }
  }
  /**
   * new时resolve传入结果，再依次调用任务队列里的方法
   */
  _resolve(value) {
    if (value && (typeof value === 'object' || typeof value === 'function')) {
      let then = value.then
      if (typeof then === 'function') {
        then.call(value, this._resolve.bind(this))
        return
      }
    }
    this.state = 'fulfilled' //改变状态
    this.value = value //存值
    this.callbacks.forEach((callback) => this._handle(callback))
  }
  _reject(error) {
    this.state = 'rejected' //改变状态
    this.value = error //存值
    this.callbacks.forEach((callback) => this._handle(callback))
  }
  finally(onDone) {
    if (typeof onDone !== 'function') return this.then()
    let PromiseP3 = this.constructor
    return this.then(
      (value) => PromiseP3.resolve(onDone()).then(() => value),
      (reason) =>
        PromiseP3.resolve(onDone()).then(() => {
          throw reason
        })
    )
  }
  static resolve(value) {
    if (value && value instanceof PromiseP3) {
      return value
    } else if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then
      return new PromiseP3((resolve) => {
        then(resolve)
      })
    } else if (value) {
      return new PromiseP3((resolve) => resolve(value))
    } else {
      return new PromiseP3((resolve) => resolve())
    }
  }
  static reject(value) {
    if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then
      return new PromiseP3((resolve, reject) => {
        then(reject)
      })
    } else {
      return new PromiseP3((resolve, reject) => reject(value))
    }
  }
}
export default PromiseP3
