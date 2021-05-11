let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('pppppp')
  }, 3000)
})

let f1 = async () => {
  let a = await p1()
  console.log('22222')
}

f1()
