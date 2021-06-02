/**

 * 1. Promise是一个对象，目的是为了解决回调地狱，可以实现链式调用

 * 2. Promise维护三个状态 pending(等待状态) fulfilled(完成状态) rejected(拒绝状态)，Promise状态一旦改变将不可更改

 * 3. resolve方法将pending -> fulfilled, reject方法将 pending -> rejected

 * 4. then方法返回一个primise对象

 * 5. Promise.all是静态方法，传递一个数组，当前数组里面每个promise对象都fulfilled，则promise.all返回一个fulfilled状态的promise，否则返回一个rejected状态的promise对象

 * 6. Promise.race是静态方法, 传递一个数组, 当数组中某个promise对象最先fuifilled或者rejected，则Promise.race返回对应状态的promise对象

 * 7. Promise.resolve是静态方法，返回一个Promise对象

 * 8. finally方法，无论前面返回的是fulfilled状态的promise，还是rejected状态的promise，finally方法都会执行并返回一个fulfilled状态的promise

 * 9. catch方法，捕获调用前promise传递的错误

 */

const FULFILLED = 'fulfilled'

const REJECTED = 'rejected'

const PENDING = 'pending'

function solvePromise(promise, data, resolve, reject) {
  if (data === promise) {
    // 2者相等，链式调用就会永远输出当前tempPromise的值，

    reject('cycle promise error')
  } else if (data instanceof MyPromise) {
    // 通过tempPromise的resolve方法，将data成fulfilled或者rejected的值传递给tempPromise

    data.then(
      (res) => resolve(res),
      (err) => reject(err)
    )
  } else {
    resolve(data) // 没有抛出异常的情况下，如果errorCallback的返回值是undefined或者其他value,都是调用resolve向下传递
  }
}

class MyPromise {
  // Promise构造函数执行时立即调用传递的函数,

  constructor(executer) {
    try {
      // executer函数内部捕获错误error， 则直接调用 this.reject函数

      executer(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  status = PENDING

  successValue = null

  errorValue = null

  successCallbackArray = [] // 存储成功回调函数，executer函数中存在异步代码，此时promise是pending状态，则需要在resolve方法中调用回调函数

  // 并且当前的promise的then方法注册了多个回调函数，需要存储

  errorCallbackArray = [] // 存储失败回调函数

  resolve = (value) => {
    // 使用箭头函数是为了this指向当前promise对象，

    if (this.status === PENDING) {
      this.status = FULFILLED // Promise状态只能从 pending->resolve 或 pending->reject

      this.successValue = value // 存储当前函数参数，then方法的回调函数中获取
    }

    while (this.successCallbackArray.length) {
      this.successCallbackArray.shift()()
    }
  }

  reject = (value) => {
    if (this.status === PENDING) {
      this.status = REJECTED

      this.errorValue = value
    }

    while (this.errorCallbackArray.length) {
      this.errorCallbackArray.shift()()
    }
  }

  then = (successCallback, errorCallback) => {
    // 为了实现链式调用，需要返回promise对象

    // 将当前promise的then方法需要完成的逻辑放在返回的promise对象的executer中执行，使用this函数能够访问到当前promise对象

    const tempPromise = new Promise((resolve, reject) => {
      // 判断状态

      if (this.status === FULFILLED) {
        // 将当前回调函数返回的值传递给tempPromise对象

        // 问题1: 当data是一个promise对象时，resolve(data)之后，下一个promise的then方法也

        // 能够正确拿到data的successValue值 ？

        // 异步调用:执行栈执行到这里的时候tempPromise没有创建成功

        setTimeout(() => {
          try {
            let data = successCallback(this.successValue)

            solvePromise(tempPromise, data, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let error = errorCallback(this.errorValue)

            solvePromise(tempPromise, error, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else {
        // 在异步调用，也需要捕获错误

        this.successCallbackArray.push(() => {
          try {
            let data = successCallback(this.successValue)

            solvePromise(tempPromise, data, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })

        this.errorCallbackArray.push(() => {
          try {
            let error = errorCallback(this.errorValue)

            solvePromise(tempPromise, error, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return tempPromise
  }

  // finally 方法里面，值只是在这里走个过场，直接穿透下一个方法中

  // 如果 callBack 里面是一个Promise，需要他执行完毕才会调用后面的方法

  // 不管this是fulfilled还是rejected，都会执行callBack,

  finally = (callBack) => {
    return this.then(
      (res) => {
        // 等待callBack执行完成之后再去return 当前this的回调函数参数res

        // 借助Promise.resolve()方法

        // Promise.resolve(callBack()).then(() => res)

        callBack()

        setTimeout((res) => {
          return res
        }, 0)
      },
      (err) => {
        // Promise.resolve(callBack()).then(() => {

        //     throw err; 此处只能抛出错误，如果return滴话，后续方法只会走第一个回调函数

        // })

        callBack()

        setTimeout((err) => {
          throw err
        }, 0)
      }
    )
  }

  catch = (errorCallback) => {
    // 捕获当前promise对象的错误

    return this.then(null, errorCallback)
  }

  static resolve(value) {
    // 静态方法，返回一个promise对象

    if (value instanceof MyPromise) {
      // 传参为primise对象，直接返回传参

      return value
    } else {
      // 新建一个promise对象返回

      return new MyPromise((resolve, reject) => {
        resolve(value)
      })
    }
  }

  static all(arr) {
    // 静态方法all， 形参arr里面所有的promise对象都执行完且是fullfilled状态，all才会返回返回fullfiled状态的promise

    // 否则返回一个rejected状态的promise, 并且顺序返回对应的值

    let result = []

    return new MyPromise((resolve, reject) => {
      // 将result根据key,value形式依次赋值，就能顺序输出, 为了获取resolve的值，需要放在executer函数中执行

      const setData = (i, data) => {
        result[i] = data

        // 当result.length === arr.length 则resolve

        if (result.length === arr.length) {
          resolve(result)
        }
      }

      for (let i = 0; i < arr.length; i++) {
        const key = i

        const value = arr[i]

        if (value instanceof MyPromise) {
          value.then(
            (res) => setData(key, res),
            (err) => setData(key, err)
          )
        } else {
          setData(key, value)
        }
      }
    })
  }

  static race(arr) {
    let key = false

    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < arr.length; i++) {
        const value = arr[i]

        const resolveFun = (data) => {
          if (!key) {
            resolve(data)

            key = true
          }
        }

        if (value instanceof MyPromise) {
          value.then(
            (res) => {
              resolveFun(res)
            },
            (err) => {
              resolveFun(res)
            }
          )
        } else {
          // 普通值则新建一个promise对象

          new MyPromise((a, b) => {
            a(value)
          }).then(
            (res) => {
              resolveFun(res)
            },
            (err) => {
              resolveFun(err)
            }
          )
        }
      }
    })
  }
}
