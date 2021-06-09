var findNumberIn2DArray = function (matrix, target) {
  let row = [],
    col = [],
    colNum = matrix[0].length - 1,
    res = false

  for (let i = 0; i < matrix.length; i++) {
    row.push(i)
  }
  for (let i = 0; i < matrix[0].length; i++) {
    col.push(i)
  }
  console.log(row, col)
  row.find((r) => {
    console.log(matrix[r][0], matrix[r][colNum])
    if (matrix[r][0] <= target && matrix[r][colNum] >= target) {
      console.log(1)
      return col.find((c) => {
        return (res = matrix[r][c] === target)
      })
    } else {
      console.log(2)
      return false
    }
  })
  return res
}

let m = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ],
  t = 5

let r = findNumberIn2DArray(m, t)
console.log(r)
