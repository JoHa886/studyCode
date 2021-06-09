var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay) {
    console.log('500定金，100优惠券！')
  } else {
    return 'nextSuccessor'
  }
}

var order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay) {
    console.log('200定金，50优惠券！')
  } else {
    return 'nextSuccessor'
  }
}

var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买！')
  } else {
    console.log('库存不足！')
  }
}

var Chain = function (fn) {
  this.fn = fn
  this.successor = null
}
Chain.prototype.setNextSuccessor = function (successor) {
  return (this.successor = successor)
}
Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments)
  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
  }
  return ret
}
Chain.prototype.next = function () {
  return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}

var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

chainOrder500.passRequest(1, true, 500)
chainOrder500.passRequest(1, false, 0)
chainOrder500.passRequest(3, true, 500)

var order100 = function (orderType, pay, stock) {
  if (orderType === 3 && pay) {
    console.log('100定金，10优惠券！')
  } else {
    return 'nextSuccessor'
  }
}

//可以自由添加
var chainOrder100 = new Chain(order100)
chainOrder200.setNextSuccessor(chainOrder100)
chainOrder100.setNextSuccessor(chainOrderNormal)
chainOrder500.passRequest(3, true, 500)
