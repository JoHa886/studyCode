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
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === PENDING) {
        //订阅
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return promise2
  }
  catch(callbackError) {
    return this.then(null, callbackError)
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  // console.log(promise2, x, resolve, reject)
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>')) //这里抛错
  }
  // new时多次调用resolve或reject要忽略后续的
  let called = false
  //判断是不是promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    //x.then可能抛错所以要catch,直接抛错reject
    try {
      let then = x.then
      // 基本可以确定是个promise
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            // new时多次调用resolve或reject要忽略后续的
            if (called) return
            called = true
            // resolve(y)
            // 递归传递,不过想x要变y
            resolvePromise(promise2, y, resolve, reject)
          },
          (r) => {
            // new时多次调用resolve或reject要忽略后续的
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        //不是的话直接resolve
        resolve(x)
      }
    } catch (e) {
      // new时多次调用resolve或reject要忽略后续的
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
export default MyPromise
// 链式调用里.then里不返promise，再一个then只会走onFulfilled，返一个promise的话，根据这个promise的状态走对应状态
