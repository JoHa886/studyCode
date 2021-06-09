var reversePrint = function (head) {
  let res = []
  for (let i = 0; i < head.length; i++) {
    res.push(head[head.length - 1 - i])
  }
  return res
}
let r = reversePrint([1, 2, 3, 4])
console.log(r)
