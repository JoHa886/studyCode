const PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
class MyPromise {
  constructor(executor) {
    this.state = PENDING
    this.value = null
    this.reason = null

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach((fn) => {
          fn()
        })
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn) => {
          fn()
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.state === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.state === REJECTED) {
      onRejected(this.reason)
    }
    if (this.state === PENDING) {
      //订阅
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}
export default MyPromise
// 链式调用里.then里不返promise，再一个then只会走onFulfilled，返一个promise的话，根据这个promise的状态走对应状态
