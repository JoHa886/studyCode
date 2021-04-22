const PENDING: string = 'pending',
  FULFILLED: string = 'fulfilled',
  REJECTED: string = 'rejected'

class PromiseTS {
  value: any
  reason: any
  status: string
  onFulfilledCallback = []
  onRejectedCallback = []

  constructor(executor) {
    const resolve: any = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
      }
    }

    const reject: any = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === PENDING) {
      this.onFulfilledCallback.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallback.push(() => {
        onRejected(this.value)
      })
    }
  }
}
