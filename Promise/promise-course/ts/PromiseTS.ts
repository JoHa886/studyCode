const PENDING: string = 'pending',
  FULFILLED: string = 'fulfilled',
  REJECTED: string = 'rejected'

class PromiseTS {
  value: any
  reason: any

  constructor(executor) {
    const resolve: void = (value) => {
      this.value = value
    }

    const reject = (reason) => {
      this.reason = reason
    }

    executor(resolve, reject)
  }
}
