console.log('Promise 存在的意义')
// Promise()同步 executor 同步
const p = new Promise((resolve, reject) => {})

// .then()异步
p.then((res) => {})

//问题：为什么Promise执行是同步的，p.then是异步的？
//异步问题同步化解决方案
