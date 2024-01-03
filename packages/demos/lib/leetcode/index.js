/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 先插入到nums1尾部再排序
var merge_88_1 = function (nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m, ...nums2.slice(0))
  return nums1.sort((a, b) => a - b)
}
// 正向双指针
const merge_88_2 = function (nums1, m, nums2, n) {
  let arr = []
  let i = 0,
    j = 0
  while (i < m || j < n) {
    if (i === m) {
      arr = arr.concat(nums2.slice(j))
      j = n
    } else if (j === n) {
      arr = arr.concat(nums1.slice(i))
      i = m
    } else if (nums1[i] < nums2[j]) {
      arr.push(nums1[i++])
    } else {
      arr.push(nums2[j++])
    }
  }
  for (let i = 0; i < m + n; i++) {
    nums1[i] = arr[i]
  }
  return nums1
}

// 逆向双指针
const merge_88_3 = function (nums1, m, nums2, n) {
  let i = m - 1
  let j = n - 1
  let tail = m + n - 1
  while (i > -1 || j > -1) {
    if (i === -1) {
      nums1[tail--] = nums2[j--]
    } else if (j === -1) {
      nums1[tail--] = nums1[i--]
    } else if (nums1[i] > nums2[j]) {
      nums1[tail--] = nums1[i--]
    } else {
      nums1[tail--] = nums2[j--]
    }
  }
  return nums1
}

/**
 * https://leetcode.cn/problems/majority-element/description/
 * @param {number[]} nums
 * @return {number}
 */
// 投票法
var majorityElement_169_1 = function (nums) {
  let count = 0
  let candidate = null

  for (let num of nums) {
    if (count === 0) {
      candidate = num
    }
    // 加减1的戏码
    count += num === candidate ? 1 : -1
  }
  return candidate
}
// 哈希计数
var majorityElement_169_2 = function (nums) {
  let obj = {}
  let len = nums.length / 2
  for (let i = 0; i < nums.length; i++) {
    let v = nums[i]
    if (typeof obj[v] === 'undefined') {
      obj[v] = 0
    }
    obj[v]++
    if (obj[v] > len) {
      return v
    }
  }
}
