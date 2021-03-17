const PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'

class PromisePeng {
  constructor(executor) {
    this.value = null
    this.reason = null
    this.state = PENDING
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.value = value
        this.state = FULFILLED
        this.onFulfilledCallbacks.forEach((fn) => fn())
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.reason = reason
        this.state = REJECTED
        this.onRejectedCallbacks.forEach((fn) => fn())
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
      this.onFulfilledCallbacks.push(() => onFulfilled(this.value))
      this.onRejectedCallbacks.push(() => onRejected(this.reason))
    }
  }
}

const o = new PromisePeng((resolve, reject) => {
  setTimeout(() => {
    resolve('123')
  }, 1000)
})

o.then((value) => {
  console.log(value)
})
