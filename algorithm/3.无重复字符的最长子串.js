/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let arr = Array.from(s)
  let i = 1
  let t = []
  let m = 0
  console.log(arr)
  while (i < arr.length) {
    if (arr[i] !== arr[i - 1]) {
      console.log(arr[i], arr[i - 1])
      m++
    } else {
      t.push(m)
      m = 0
    }
    i++
  }
  console.log(t)
  return Math.max(t)
}
let b = lengthOfLongestSubstring('abcabcbb')
console.log(b)
// @lc code=end
