/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  let t = nums
  t.sort((a, b) => {
    return b - a
  })
  console.log(t)
  return t[k - 1]
}
// @lc code=end
