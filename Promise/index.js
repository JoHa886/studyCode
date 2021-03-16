// console.log('Promise 存在的意义')
// Promise()同步 executor 同步
// const p = new Promise((resolve, reject) => {})

// .then()异步
// p.then((res) => {})

//问题：为什么Promise执行是同步的，p.then是异步的？
//异步问题同步化解决方案

//极简版promise
// import PromiseP1 from './promise-course/index1'
// const p = new PromiseP1((resolve) => {
//   // debugger
//   // setTimeout(() => {
//   console.log('done')
//   resolve('1秒')
//   // }, 1000)
// })

// p.then((r) => {
//   console.log('aaa:', r)
// })
// p.then((r) => {
//   console.log('bbb:', r)
// }).then((r) => {
//   console.log('ccc:', r)
// })

// console.log('最后')

// import PromiseP2 from './promise-course/index2'
// const p = new PromiseP2((resolve) => {
//   // debugger
//   // setTimeout(() => {
//   console.log('done')
//   resolve('1秒')
//   // }, 1000)
// })

// p.then((r) => {
//   console.log('aaa:', r)
// })
// p.then((r) => {
//   console.log('bbb:', r)
// }).then((r) => {
//   console.log('ccc:', r)
// })

// console.log('最后')

// import PromiseP3 from './promise-course/index3'
// const p = new PromiseP3((resolve, reject) => {
//   // debugger
//   // setTimeout(() => {
//   console.log('done')
//   resolve('1秒')
//   // }, 1000)
// })

// p.then((r) => {
//   console.log('aaa:', r)
//   return r + '333'
// })
//   .then((r) => {
//     console.log('bbb:', r)
//   })
//   .then((r) => {
//     console.log('ccc:', r)
//   })

// console.log('最后')
import MyPromise from './promise-course/MyPromise'
// console.log(MyPromise)
let p = new MyPromise((resolve, reject) => {
  // resolve('123')
  // throw new Error('错误')
  setTimeout(() => {
    reject('hahaha')
  }, 2000)
})
p.then(
  (res) => {
    console.log('1', res)
  },
  (rej) => {
    console.log('1', rej)
  }
)
p.then(
  (res) => {
    console.log('2', res)
  },
  (rej) => {
    console.log('2', rej)
  }
)
