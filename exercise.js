//更优
function twoSum() {
  let nums = [2, 7, 3, 6, 1];
  let target = 9;
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let x = target - nums[i];
    if (map.has(x)) {
      return [map.get(x), i];
    }
    map.set(nums[i], i);
  }
}
twoSum();

function towSum2() {
  let nums = [2, 7, 3, 6, 1];
  let target = 9;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j];
      }
    }
  }
}
console.log(towSum2());

const threeSum = (nums) => {
  nums.sort((a, b) => a - b); // 排序

  const res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // 外层遍历
    let n1 = nums[i];
    if (n1 > 0) break; // 如果已经爆0，不用做了，break
    if (i - 1 >= 0 && n1 == nums[i - 1]) continue; // 遍历到重复的数，跳过

    let left = i + 1; // 左指针
    let right = nums.length - 1; // 右指针

    while (left < right) {
      let n2 = nums[left],
        n3 = nums[right];
      if (n1 + n2 + n3 == 0) {
        res.push([n1, n2, n3]);
        while (left < right && nums[left] == n2) left++;
        while (left < right && nums[right] == n3) right--;
      } else if (n1 + n2 + n3 < 0) {
        left++;
      } else {
        right--;
      }
    }
    //   while (left < right) {
    //     let n2 = nums[left], n3 = nums[right];

    //     if (n1 + n2 + n3 === 0) {  // 三数和=0，加入解集res
    //       res.push([n1, n2, n3]);
    //       while (left < right && nums[left] == n2) left++; // 直到指向不一样的数
    //       while (left < right && nums[right] == n3) right--; // 直到指向不一样的数
    //     } else if (n1 + n2 + n3 < 0) { // 三数和小于0，则左指针右移
    //       left++;
    //     } else {      // 三数和大于0，则右指针左移
    //       right--;
    //     }
    //   }
  }
  return res;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

var removeDuplicates = function (nums) {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  let fast = 1,
    slow = 1;
  while (fast < n) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      ++slow;
    }
    ++fast;
  }
  return slow;
};
var removeDuplicate = function (nums) {
  let obj = new Set(nums);
  return [...obj].length;
};
console.log(removeDuplicates([1, 1, 2, 3, 5, 6, 6]));

var removeDuplicatesm = function (nums) {
  const n = nums.length;
  let fast = (slow = 0);
  while (fast < n) {
    if (nums[fast] != nums[slow]) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }
  return slow;
};
console.log(removeDuplicatesm([1, 1, 2, 3, 5, 6, 6]));


//随机插入求一个数求是否组成顺子,无序
//算法思路,一步步死磕到底
//2,3 判断是否是相邻的,是则加进来.
//3,5 判断是否是相邻的
//第二步:右边不相邻,则不再往后进行. 左边相邻,则上移一位继续判断,如果是序列则加进来.
//第三步:继续上移,判断是否是序列.  是序列是否要排序,排序可以多兼容?  要兼容吗123  132  00-3-124
//每次尝试两个, 312成立则继续添加右边的,300成立则继续左边的,310成立则串联左右.
//加进来排序然后判断是否是递增的(有一个前后不等则不是)
//实现了左右2位可以无序,指针再往外则需有序了.

function pukepai(sums) {
  let index = 3;
  let arr1 = [];
  let arr = [];
  let arr2 = [];

  //左边
  if (index >= 2) {
    arr1 = [sums[index - 2], sums[index - 1], sums[index]];
    arr1.sort((a, b) => a - b);
    let isExsit = arr1.some((ele, i) => {
      if (i < arr1.length - 1) {
        return ele != arr1[i + 1] - 1;
      }
    });
    isExsit && (arr1 = []);
  }
  //中间
  if (index >= 1) {
    arr = [sums[index - 1], sums[index], sums[index + 1]];
    arr.sort((a, b) => a - b);
    let isExsit = arr.some((ele, i) => {
      if (i < arr1.length - 1) {
        return ele != arr[i + 1] - 1;
      }
    });
    isExsit && (arr = []);
  }

  //右边
  if (index < sums.length - 2) {
    arr2 = [sums[index], sums[index + 1], sums[index + 2]];
    arr2.sort((a, b) => a - b);
    let isExsit = arr2.some((ele, i) => {
      if (i < arr2.length - 1) {
        return ele != arr2[i + 1] - 1;
      }
    });
    isExsit && (arr2 = []);
  }
  console.log(arr);
  console.log(arr1);
  console.log(arr2);
  if (arr1.length > 0) {
    let pre = index - 3;
    while (pre >= 0) {
      arr1.unshift(sums[pre]);
      let isExsit = check(arr1);
      if (isExsit) {
        arr1.shift(sums[pre]);
        break;
      }
      pre--;
    }
  }
  if (arr2.length > 0) {
    let next = index + 3;
    while (next < sums.length) {
      arr2.push(sums[next]);
      let isExsit = check(arr2);
      if (isExsit) {
        arr2.pop(sums[next]);
        break;
      }
      next++;
    }
  }
  //合并
  let result = [];
  if (arr1.length > 0) result.push(...arr1);
  if (arr.length > 0) result.push(...arr);
  if (arr2.length > 0) result.push(...arr2);

  console.log([...new Set(result)]);
}
console.log(pukepai([0, 2, 1, 3, 5, 4, 6, 5]));
function check(arr) {
  arr.sort((a, b) => a - b);
  let isExsit = arr.some((ele, i) => {
    if (i < arr.length - 1) {
      return ele != arr[i + 1] - 1;
    }
  });
  return isExsit;
}

//move时走end事件一直重置所有坐标,自己的排除


//求多个数组之间的交集  [2,1] [2,3]    [2,1] [4,3]
//数组1遍历,有2的元素则拿过来
function merge(arr1, arr2) {
  // let result = [];
  // arr1.forEach((e) => {
  //   let item = arr2.find((item) => item == e);
  //   item && result.push(item);
  // });
  // console.log("交集", result);
  // return result;
  let result = arr1.filter((e) => {
    return arr2.some((item) => item == e);
  });
  console.log("交集", result);
}
merge([2, 1], [2, 3]);
merge([2, 1], [4, 3]);


//是否是回文字符串  adddddda, addddda, adddasd 用while实现
function isPalindrome(str) {
  let pre = 0,
    last = str.length - 1;
  while (pre < last) {
    if (str.charAt(pre) != str.charAt(last)) {
      return false;
    }
    pre++;
    last--;
  }
  return true;
}
console.log(isPalindrome("adddddda"));
console.log(isPalindrome("addddda"));
console.log(isPalindrome("adddasd"));


/////无重复字符的最长子串  abcabcbb-->abc bbbbb->b pwwkew->wke
//与整个相比较, 如果有重复则全部删掉,存当前的.
//循环,先循环i,然后i++,整个遍历下去.    二维数组来储存.
// 方法1:不在则 push 进数组
// 在则删除滑动窗口数组里相同字符及相同字符前的字符，然后将当前字符 push 进数组
// 然后将 max 更新为当前最长子串的长度
// 遍历完，返回 max 即可
function lengthOfLongestSubstring(str) {
  let arr = [];
  let max = 0;
  for (let i = 0; i < str.length; i++) {
    let a = str.charAt(i);
    let index = arr.indexOf(a);
    if (index == -1) {
      arr.push(a);
    } else {
      max = Math.max(arr.length, max);
      arr = arr.splice(0, index);
    }
  }
  console.log("max===", max);
  return max;
}
lengthOfLongestSubstring("abcabcbb");
lengthOfLongestSubstring("bbbbb");
lengthOfLongestSubstring("pewwkw");
//维护下标
function lengthOfLongestSubstring2(str) {
  let res = 0;
  let subStr = "";
  for (let i = 0; i < str.length; i++) {
    let a = str.charAt(i);
    let index = subStr.indexOf(a);
    if (index == -1) {
      subStr += a;
      res = Math.max(res, subStr.length);
    } else {
      subStr = subStr.substr(index + 1) + a; //不留自己,往下遍历
      console.log("sub=", subStr);
    }
  }
  console.log("res===", res);

  return res;
}
lengthOfLongestSubstring2("abca");
lengthOfLongestSubstring2("bbbbb");
lengthOfLongestSubstring2("pwwkew"); //pw ww
//k wk   e-->wke  w->kew

//1.栈  实现四个方法
var MinStack = function () {
  this.items = [];
  this.min = null;
};
MinStack.prototype.push = function (x) {
  if (this.items.length == 0) this.min = x;
  this.min = Math.min(this.min, x);
  this.items.push(x);
};
MinStack.prototype.pop = function (x) {
  this.items.pop(x);
  this.min = this.items.reduce((pre, next) => {
    return pre < next ? pre : next;
  });
};
MinStack.prototype.top = function () {
  return this.items[this.items.length - 1];
};
MinStack.prototype.getMin = function () {
  return this.min;
};
var minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // --> 返回 -3.
minStack.pop();
console.log(minStack.top()); //--> 返回 0.
console.log(minStack.getMin()); //--> 返回 -2.


////有效的括号 给定一个只包括 '(' ，')' ，'{' ，'}' ，'[' ，']' 的字符串，判断字符串是否有效。
//依次推入左边的元素, 追加右边的元素只要与上一个不一致则为false. 一致则相抵消.
function test(str) {
  let arr = []; 
  for (let i = 0; i < str.length; i++) {
    let map = {
      "{": "}",
      "(": ")",
      "[": "]",
    };
    let c = str.charAt(i);
    //左边的部分
    if (map[c]) {
      arr.push(c);
    } else if (map[arr.pop()] != c) {
      return false;
    }
  }
  return arr.length == 0;
}
console.log(test("([{}]))"));
console.log(test("()[]{}"));
console.log(test("(]"));
console.log(test("([)]"));
console.log(test("{[]}"));


//2..删除字符串中的所有相邻重复项 abbaca 
//依次推入元素,相同则同时移除.指针指向最后一个元素.
function removeStrDuplicates(str) {
  let arr = []; 
  for (let i = 0; i < str.length; i++) {
    let c = str.charAt(i);
    //左边的部分
    let pre = arr.pop()
    if ( pre!= c) {
      arr.push(pre);
      arr.push(c);
    } 
  }
  return arr.join("")
}
console.log(removeStrDuplicates('abbcbb'))



////3..最长公共前缀
//数组的形式.挨个遍历每个字符.  0相等 1不等则跳出,并--. 0相等1相等则++2相等则输出最大.
function findCommon(strs){
 let res = strs.reduce((pre,next)=>{
    return pre.length<next.length?pre:next
  })
  let index = 0 
  while(index<res.length){
    let last = res.charAt(index)
   let notSame =  strs.some((e,i)=>{
     return e.charAt(index) != last;
    })
    if(notSame){
      index--;
      break
    }
    index++;
  }
  if(index >=0){
   return res.slice(0,index+1)
  }
  return null
}
console.log(findCommon(["flower","flow","flight"]))
console.log(findCommon(["dog","racecar","car"]))
console.log(findCommon(["cir","car"]))
var longestCommonPrefix = function (strs) {
  if (!strs.length) return ''
  let res = strs[0]

  for (let i = 0; i < res.length; i++) {
    let item = res[i]
   let notsame =  strs.some(ele=>{
     return ele[i] !== item
    })
    if(notsame){
      res = res.slice(0,i)
      break;
    }
  }
  return res
};
console.log(longestCommonPrefix(["flower","flow","flight"]))
console.log(longestCommonPrefix(["dog","racecar","car"]))

console.log(longestCommonPrefix(["cir","car"]))



////4..////翻转字符串里的单词(js手动实现)
//s = "the sky is blue" 输出:"blue is sky the"
var reverseWords = function(s) {
  let list = [], str = '', resStr = ''
  s += ' '   // 加个空格 防止最后一个不是空格的情况, 确保循环到最后能把最后一个加到数组中, 省得再在下面判断
  for(let i = 0; i < s.length; i++){
    if(s[i]!==' '){
      str += s[i]
    }else{
      str && list.push(str)
      str = ""
    }
  }
  for(let j = list.length - 1; j >= 0; j--){
    if(j !== 0){
      resStr += list[j] + ' '
    }else{
      resStr+=list[j]
    }
  }
  return resStr
};
console.log(reverseWords("the sky is blue"))

// 使用双指针的方法，从后向前遍历字符
// 快指针一直减,然后推进去,然后遇到空格,慢指针等于快指针,下一轮遍历
var reverseWords2 = function (s) {
  let low = s.length - 1,
    fast = low;
  let res = [];
  while (fast > -1) {
    //找到单词的尾部
    while (s[fast] != " " && s[fast] != void 0) {
      fast--;
    }
    fast < low && res.push(s.slice(fast+1, low+1));
    while (s[fast] === " ") fast--;
    low = fast;
  }
  return res.join(' ')
};
console.log(reverseWords2("the sky is blue"))



//////5./给定两个数组，编写一个函数来计算它们的交集
//nums1 = [1,2,2,1], nums2 = [2,2]
var intersection = function (nums1, nums2) {
  let obj = {}
  let ret = []
  for(let i = 0;i<nums1.length;i++){
    let c = nums1[i];
    obj[c] = c
  }
  for(let i = 0;i<nums2.length;i++){
    if(obj[nums2[i]] !=undefined){
      ret.push(nums2[i]);
      obj[nums2[i]] = undefined
    }
  }
  return ret;
}
console.log(intersection([4,9,5],[9,4,9,8,4]))


var merge = function(nums1, m, nums2, n) {
  //归并思想
  //先追加nums1>nums2时加入nums2,同时j++,再对比.
  //剩余的全部加入
  let i = j =0;
  let res = []
  while(i< m && j < n){
      if(nums1[i] < nums2[j]){
          res.push(nums1[i])
          i++;
      }else{
          res.push(nums2[j])
          j++;
      }
  }
  while(i < m){
      res.push(nums1[i++])
  }
  while(j<n){
      res.push(nums2[j++])
  }
  return res;
};
console.log(merge([1,2,3,0,0,0],3,[2,5,6],3))


////1. 括号生成
// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
//以数形式遍历,左右分支为(,)对应的个数. 回溯算法
const geberate=(n)=>{
  let res = []
  const dfs = (path,left,right)=>{

    //结束条件
    console.log('path=',path)
    if(left < right || left > n)return;
    if(left+right ===2*n){
      res.push(path)
      return;
    }
    //依次递归
    dfs(path+'(',left+1,right)
    dfs(path+')',left,right+1)
  
  }
  dfs("",0,0)
 return res;
}
console.log(geberate(3));


///////2.// 全排列问题
//给定一个 没有重复 数字的序列，返回其所有可能的全排列。
//1,2,3 
//传入空path,循环出所有的选项,并用if跳过重复项.  每轮迭代,清空初始值,继续选.
const permute = (nums) => {
  let res = [];
  let used = {};
  function dfs(path) {
    //结束条件
    if (path.length === nums.length) {
      res.push(path.slice());
      console.log('over')
      return;
    }
    //组合数据
    for(let i = 0; i< nums.length;i++){
      let num = nums[i];
      console.log('path=',path,"&i:",i)
      if (used[num]) continue;
      path.push(num);
      used[num] = true;
      dfs(path);
      // console.log('path2=',path,"&i:",i,'&idx:',idx)
      path.pop();
      used[num] = false;
    }
  }
  dfs([]);
  return res;
};
console.log(permute([1,2,3]));


//////3 分割数组为连续子序列
//寻找满足条件的序列(连续且子序列长度为3)
const isPossible2 = function(nums){

  const map = new Map()
  for(const n of nums){
    let value = map.get(n) || 0 
    map.set(n,value+1);
  }
  console.log(map)

  while(map.size){
    let len = 0, max =0, last
    for(let [key,value] of map){
      //max>value下一个数降序,则跳出. 或者下一个数比现在大于1.不连续,也跳出. 取完后长度小于3不满足,return.
      //max和last记录上一个的value和key用于判断.
      if(max > value || (len && key-last>1))break
      max = value
      last = key
      len++
      if(value-1>0){
        map.set(key,value-1)
      }else{
        map.delete(key)
      }
    }
    if(len && len<3){
      return false;
    }
  }
  return true

}
console.log(isPossible2([1,2,3,3,4,4,5,5]))



///////4...最长回文子串 动态规划
//输入babad 输出bab或者aba
const longestPalindrome = (s) => {
  if(s.length <2)return


  let res = ''
  let dp = Array.from(new Array(n),() => new Array(n).fill(false));//初始化数组 
  let n = s.length;

  for(let i=n-1;i>=0;i--){
    
  }
  
}