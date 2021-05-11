//颜色
let color = /^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
// console.log(color.test('#fff'))

//时间
let time = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/
console.log(time.test('18:59'))
