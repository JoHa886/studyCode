function ppp(x, i) {
  return x * i
}
let arr123 = [1, 2, 3]
let rt = arr123.map(ppp)
console.log(rt)
const rq = function () {
  // setTimeout(() => {
  return Math.random()
  // }, 1000)
}

class Single {
  instance = null
  key = null
  constructor() {
    this.key = rq()
  }
  static getInstance() {
    return this.instance || (this.instance = new Single())
  }
}
let a1 = Single.getInstance()
let a2 = Single.getInstance()
let a3 = Single.getInstance()

console.log(a1.key, a2.key, a3.key)
