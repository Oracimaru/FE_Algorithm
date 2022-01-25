### 一:字符串相关

##### 1.大数求和

```typescript
//大数求和 "1001".padStart(5,0);===>"01001"
let a = "1001";//"9007199254740991";
let b = "13"//"1234567899999999999";
function add(a ,b){
   //取两个数字的最大长度
   let maxLength = Math.max(a.length, b.length);
   //用0去补齐长度
   a = a.padStart(maxLength , 0);//"0009007199254740991"
   b = b.padStart(maxLength , 0);//"1234567899999999999"
   //定义加法过程中需要用到的变量
   let next = 0;   //"进位"
   let sum = "";
   for(let i=maxLength-1 ; i>=0 ; i--){
      let acc = parseInt(a[i]) + parseInt(b[i]) + next;
      f = Math.floor(acc/10);
      sum = acc%10 + sum;
   }
   if(next == 1){
      sum = "1" + sum;
   }
   return sum;
}
console.log(add(a,b));
```

##### 2. 字符串去重处理

```typescript
function demo(str){
  return  [ ...new Set(str.split("")) ].join('');
}

```

##### 3.输入是否是回文字符串

```typescript
#前后对称
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
console.log(isPalindrome("adddddda"));true
console.log(isPalindrome("addddda"));true
console.log(isPalindrome("adddasd"));false
```

##### 4.去除str两端空格

```typescript
1. str.trim();或者正则
2.console.log(" jjkfadf  dfj  ".replace(/^\s+|\s+$/g,""));
```

##### 5.删除字符串中的所有相邻重复项

```typescript
// abbaca 利用栈
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
console.log(removeStrDuplicates('abbaca'))==>"ca"
```

##### 6.给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。s = "abcabcbb"

```typescript
abc ==> 3 
var lengthOfLongestSubstring = function(s) {
    var res = 0; // 用于存放当前最长无重复¬子串的长度
    var str = ""; // 用于存放无重复子串
    var len = s.length; 
    for(var i = 0; i < len; i++) {
      var char = s.charAt(i);
      var index = str.indexOf(char);
      if(index === -1) {
        str += char;
        res = res < str.length ? str.length : res;
      } else {
        str = str.substr(index + 1) + char;
      }
    }
    return res; 
};
//维护数组方式
function lengthOfLongestSubstring(str) {
  let arr = [];
  let max = 0;
  for (let i = 0; i < str.length; i++) {
    let a = str.charAt(i);
    let index = arr.indexOf(a)
    if (index == -1) {
      arr.push(a);
    }else{
      max = Math.max(arr.length,max);
      arr = arr.splice(0,index)
    }
  }
  console.log('max===',max)
  return max;
}
```

##### 7.有效的括号

```typescript
# 给定一个只包括 '(' ，')' ，'{' ，'}' ，'[' ，']' 的字符串，判断字符串是否有效。
function isValid(str) {
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
console.log(isValid("([{}]))"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));
console.log(isValid("([)]"));
console.log(isValid("{[]}"));
//依次推入左边的元素, 追加右边的元素只要与上一个不一致则为false. 一致则相抵消.
```

##### 8.字符串原位反转&反转

```typescript
例如：将“I am the good boy”反转变为 “I ma eht doog yob”。
提示：使用数组和字符串方法。 注意分割符号,空格和非空格.
function reverseInPlace(str){
 return str.split(' ').reverse().join(' ').split('').reverse().join('');
}
console.log(reverseInPlace('I am the good boy'));
#字符串反转,非reverce方式
//使用双指针的方法,快指针一直减,然后推进去,然后遇到空格,慢指针等于快指针,下一轮遍历
var reverseWords = function (s) {
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

```

##### 9.字符串转成驼峰

```typescript
function element(str){
	let arr = str.split("-");
	return arr.map((ele)=>{
		return ele.charAt(0).toUpperCase()+ele.substring(1);
	}).join("");
}
function transformStr3(str){
    var re=/-(\w)/g;
    return str.replace(re,function ($0,$1){
    	console.log($0,$1);
        return $1.toUpperCase();
    });
}
console.log(element("get-element-by-id"));
```

##### 10.统计一个字符串出现频率最高的字母/数字

```typescript
function maxTest(str){
	let string = [...str],
	maxValue='',
	obj={},
	max = 0;
	string.forEach(ele=>{
		if(obj[ele] == undefined){
			obj[ele]=1;
		}else{
			obj[ele] +=1;
		}
		if(obj[ele]>max){
			max = obj[ele];
			maxValue = ele;
		}
	})
	return maxValue;
}
console.log(maxTest('asdfghjklaqwertyuiopiaia'));
```

##### 11.将数字12345678转化成RMB形式,或者一串数字每隔3个加一个逗号实现

```typescript
function RMB(str){
 let arr = str.split("").reverse();
 let res = [];
 for(let i = 0; i < arr.length; i++){
 res.push(arr[i]);
 if ((i + 1) % 3 === 0) {
 res.push(",");
 }
 }
 return res.reverse().join("");
}
console.log(RMB("12345678"))
去掉两个reverse输出123,456,78  12,345,678
```

##### 12.最长公共前缀

```typescript
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
#查找字符串数组中的最长公共前缀
console.log(longestCommonPrefix(["flower","flow","flight"]))-->fl
console.log(longestCommonPrefix(["dog","racecar","car"]))-->""
console.log(longestCommonPrefix(["cir","car"]))--> c

```



### 二:数组相关

##### 1.找出数组里落单的那个数

```typescript
#直接对数组中每个值异或操作，成对的数都将被消除掉
function single(){
    var arr=[1,1,2,3,5,6,3,2,5];
let result=0;
for(let i = 0;i<arr.length;i++) {
	result=result^arr[i];
}
console.log(x1)
}
```

##### 2.合并二维数组为一维有序数组(扁平化处理)

```typescript
function flat(arr) {
  let copyArr = [...arr]
  while (copyArr.some(item => Array.isArray(item))) {
    copyArr = [].concat(...copyArr)
  }
  return copyArr.sort((a, b) => {return a - b })
}
console.log(flat([[1, 2], [6, 4, 2], [3]]));

注意:concat(...copyArr)会把copyArr的二级数组拆分.
如[1,2].concat(...[1,[1,2]])输出[1, 2, 1, 1, 2].
###将数组扁平化去并除其中重复部分数据
    var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
//转成string,split成一维数组,set去重后map转string为number类型.
Array.from(new Set(arr.toString().split(','))).map(Number).sort((a,b)=>a-b)
```

##### 3.数组去重处理

```typescript
let arr=[1,2,3,4,4,5,6,6];
function demo(arr) {
    let obj = new Set(arr);
    return [...obj]
}
demo(arr);
#双指针法
var removeDuplicatesm = function(nums) {
    const n = nums.length;
    let fast=slow=0;
    while(fast<n){
        if(nums[fast] != nums[slow]){
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
    return slow;
}
console.log(removeDuplicatesm([1,1,2,3,5,6,6]));

```

##### 4.乱序数组(打乱数组)

```typescript
function sort(arr){
	return arr.sort(()=>{return Math.random()-0.5});
}
console.log(sort([1,2,3,4,5]));
//加强版
function shuffle(arr){
	for(let i = arr.length; i>0 ; i--){
		let j = Math.floor(Math.random()*i);
		[arr[i-1],arr[j]] = [arr[j],arr[i-1]];
	}
	return arr;
}
console.log(shuffle([1,2,3,4,5]));

```

##### 5.数组求a+b=c

```typescript
//主要思路是利用排序好的数组从小到大的原理，移动a和b，然后在b的右侧寻找相等的c.
function searcher(arr){
	let len = arr.length;
	let abcpair = [];
	for (var a = 0; a < len; a++) {
		let b = a;
		let c = a+1;
		while(c < len){
			//因为数组有序，所以若a + b > c 则说明c有可能在右边,移动c
		 if(arr[a] + arr[b] > arr[c]){
		 	c++;
		 }else if(arr[a]+arr[b]<arr[c]){
		 	//若 a + b < c,c不可能在右边，b往右移
		 	b++;
		 }else{
		 	let pair = [arr[a],arr[b],arr[c]]; 
		 	abcpair.push(pair);
		 	c++;
		 }	
		}
	}
	return abcpair;
}
console.log(searcher([3,5,8,9,12,21,27]));
##查找a+b=9的序号
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
```

##### 6.不借助临时变量，进行两个整数的交换

```typescript
# (算术运算（加减)或者异或.
const swop = (a, b) => {
    b = b - a;
    a = a + b;       a ^= b; //x先存x和y两者的信息
                     b ^= a; //保持x不变，利用x异或反转y的原始值使其等于x的原始值
                     a ^= b;
    b = a - b;
    return [a,b];
}
console.log(swop(2,3)) // [3,2]
```

##### 7.数组求最大,最小值

```typescript
#5.4数组最大最小值
function max(arr){
	return arr.reduce((pre,next)=>{
		return pre > next ?pre :next;
	})
}
console.log(max([1,2,4,3,5]));

```

##### 8.最大子序和

```typescript
var maxSubArray = function(nums) {
    let ans = nums[0], max = nums[0]
    for (let i = 1; i < nums.length; i++) {
        ans = Math.max(nums[i] + ans, nums[i])
        //nums[i] = ans
        max = Math.max(ans, max)
    }
    return max
};
console.log(maxSubArray([-2,6,-1,5,4,-7,2,3]));//14

```

##### 9.寻找两个正序数组的中位数

```typescript
var findMedianSortedArrays = function(nums1,nums2){
  const merged = [];
  let i=0,j=0;
  while(i<nums1.length && j<nums2.length){
    if(nums1[i] < nums2[j]){
      merged.push(nums1[i++]);
    }else{
      merged.push(nums2[j++]);
    }
  }
  while(i< nums1.length){
    merged.push(nums1[i++]);
  }
  while(j<nums2.length){
    merged.push(nums2[j++]);
  }
  const{length}= merged;
  return length %2==0?(merged[length/2]+merged[length/2-1])/2: merged[Math.floor(length/2)];
}
console.log(findMedianSortedArrays([1,2],[3,4]));//(2 + 3)/2 = 2.5

```

##### 10. 两个数组的交集

```typescript
# 不用set方式 easy
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
console.log(intersection([4,9,5],[9,4,9,8,4]))-->[9,4]
```



### 三:排序

##### 1.归并排序

```typescript
function merge_sort(arr){
  if(arr.length < 2){
    return arr;
  }
  var middle = parseInt(arr.length/2);
  var left = arr.slice(0,middle);
  var right = arr.slice(middle);
  var leftSort = merge_sort(left);
  var rightSort = merge_sort(right);
  var result = merge(leftSort,rightSort);
  return result;
}
```

##### 2.对两个有序数组进行合并排序

```typescript
function merge (left,right){
  const result = [];//考虑用const
  var i = 0, j = 0;
  while(i < left.length && j < right.length){
    if(left[i] > right[j]){
      result.push(right[j++]);
    }
    else{
      result.push(left[i++]);
    }
  }
  while(i < left.length){
    result.push(left[i++]);
  }
  while(j < right.length){
    result.push(right[j++]);
  }
  
  return result;
}
console.log(merge([1,2,3],[2,5,6]))
var arr = [1,8,3,6,7, 9,2, 5];
var result = merge_sort(arr);
console.log(result);
```

##### 3.有序数组的二分查找

```typescript
function binary-search(arr,key){
       var low=0,
           high=arr.length-1,
           mid=null;
       while(low<=high){
           mid=Math.floor((low+high)/2);
           if(key==arr[mid]){
               return mid;
           }else if(key<arr[mid]){
               high=mid-1;
          }else{
              low=mid+1;
          }
      }
      return -1;
  }
const arr = [1, 4, 5, 6, 7, 8, 10, 11, 23, 42, 44, 54, 56, 77, 102]
console.log(BinarySearch(arr, 44))--->输出10

```

##### 4.冒泡排序

```typescript
function sort(arr){
  let len = arr.length;
  for(let i =0; i < len-1; i++){
    for(let j = 0; j < len-1-i; j++){
      if(arr[j]>arr[j+1]){
        let temp = arr[j+1];
        arr[j+1]=arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
```

##### 5.快速排序

```typescript
#（1）在数据集之中，选择一个元素作为"基准"（pivot）。
 （2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
 （3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
 var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];//返回数组[2]的0
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
};
```

##### 6.二叉树层序排序

```typescript
var levelOrderTraversal = function(node) {
  var que = []
  que.push(node)
  while(que.length !== 0) {
    node = que.shift()
    console.log(node.value)
    if(node.left) que.push(node.left)
    if(node.right) que.push(node.right)
  }
}
```

##### 7.堆排序

```typescript
// 建最大堆
var len; //定义成全局变量
function buildHeap(arr) {
    len = arr.length;
    for (var i = Math.floor(arr.length / 2);i>=0; i--) {
        adjustHeap(arr, i)  //调整堆
    }
}
//堆调整
function adjustHeap(arr, i) {
    var left = 2 * i + 1,    // 左节点位置
        right = 2 * i + 2,  //右节点位置
        largest = i; // 最大值位置
    //如果左节点存在并且左节点大于 当前最大节点，交换位置
    if (left < len && arr[left] > arr[largest]) {
        largest = left
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }
    //如果发现修改了，则交换位置
    if (largest !== i) {
        swap(arr, i, largest);
        adjustHeap(arr, largest)
    }
}
//交换位置
function swap(arr, i, j) {
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}
// 堆排序算法
function heapSort(arr) {
    buildHeap(arr)  //建堆
    for (var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);  //堆顶一定是最大元素，将堆顶和尾部元素交换，最大元素就保存在尾部，并且不参与后面的调整
        len--; //  去掉这个是从大到小排序
        adjustHeap(arr, 0) ///将最大的元素进行调整，将最大的元素调整到堆顶
    }
    return arr
}
```

### 四:其他

##### 1.防抖,节流

```typescript
//连续触发在最后一次执行方法  动作发生后一定时间后触发事,如果该动作又发生,则重新计时
let debounce = (fn,time=1000)=>{
	let timeLock=null;
	return function(...args){
		clearTimeout(timeLock);
		timeLock = setTimeout(()=>{
			fn(...args);
		},time)
	}
}
//一定时间内只触发一次:节流  在这段时间内，如果动作又发生，则无视该动作
let throttle=(fn,time=1000)=>{
	let flag = true;
	return function(...args){
		if(flag){
			flag = false;
			setTimeOut(()=>{
				flag=true;
				fn(...args);
			},time)
		}
	}
}
```



##### 2.闭包应用:使用闭包实现每隔一秒打印 1,2,3

```typescript
for(var i=1;i<=5;i++){
	(function(i){
	 setTimeout(()=>{
		console.log(i);
	},1000*i)
	})(i)
}   或者直接使用let和setTimeout.

```

##### 3.手写一个 count 函数,每次调用一个函数自动加 1

```typescript
var count = (function () {
  var a = 0
  return function () {
    console.log(++a)
  }
})()
count()// 1  count()// 2  count()// 3
```

##### 4.实现一个sleep

```typescript
function sleep(delay){
	var start = (new Date()).getTime();
	while((new Date()).getTime()-start < delay){
		continue;
	}
}    或者promise:
const sleep1=(time=1000)=>{
	return new Promise((resolve)=>{
		setTimeout(resolve,time);
	})
}
sleep1(2000).then(()=>{
	console.log(111);
})
```

##### 5.单例

```typescript
class ConfigManager{
	static _instance:ConfigManager = null;
	static getInstance(){
		return this._instance || (this._instance =new ConfigManager());
	}
}
export var CONFIG = ConfigManager.getInstance();

```

##### 6.斐波那契数列第n项的值

```typescript
结构:0、1、1、2、3、5、8、13、21、34从第三项起,每一项等于前两项的和
function fibonacci(n) {
  let pre = 1;
  let cur = 1;
  let data;
  if(n == 1 || n==2){
    return n;
  }
  for(let i =3;i<=n;i++){
    data = pre+cur;
    pre = cur;
    cur = data;
  }
  return data;
}
```

##### 7.用Rand7()实现Rand10() 拒绝采样

```typescript
var rand10 = function () {
    let num;
    do {
        num = rand7() + (rand7() - 1) * 7;
    } while (num < 40);
    return 1 + num % 10;
};
```

### 五:二叉树

##### 1.二叉树公共祖先

```typescript
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(r, a, b) {
  if(r === null || r === a || r === b)
    return r;
  
  let left = lowestCommonAncestor(r.left, a, b);
  let right = lowestCommonAncestor(r.right, a, b);
  
  if(left !== null && right !== null) 
    return r;
  return left !== null ? left : right;
};
```

##### 2.二叉树最大深度，最小深度

```typescript
var maxDepth = function(root) {
    if (!root) {
        return 0;
    }
   return  1 + Math.max(maxDepth(root.left) , maxDepth(root.right) )
};
function minDepth(root) {
    if (root === null) return 0;
    if (!root.left&&!root.right) return 1;//当前节点为叶子节点时
    if (root.left&&!root.right) return 1+minDepth(root.left);//只有一个字节点时 减枝
    if (!root.left&&root.right) return 1+minDepth(root.right);//只有一个字节点时 减枝
    return 1+Math.min(minDepth(root.left),minDepth(root.right)) //存在两个字节点
}
```

##### 3.先序，中序，后序遍历，层次遍历,广度优先遍历

```typescript
#先序遍历
var preOrder = function (node) {
  if (node) {
    console.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
  }
}
#中序遍历
var inOrder = function (node) {
  if (node) {
    inOrder(node.left);
    console.log(node.value);
    inOrder(node.right);
  }
}
#广度优先遍历
var levelOrder = function(root) {
	var checkArr = [root];
	while (checkArr.length > 0) {
		var newCheckArr = [];
		for (var i = 0; i < checkArr.length; i++) {
			var item = checkArr[i];
			console.log(item.val);
			item.left && newCheckArr.push(item.left);	
			item.right && newCheckArr.push(item.right);	
		}
		checkArr = newCheckArr;
	}
};
#层次遍历:从上到下,从左到右,优先
var levelOrder = function(root) {
	var checkArr = [root];
	while (checkArr.length > 0) {
		var newCheckArr = [];
		for (var i = 0; i < checkArr.length; i++) {
			var item = checkArr[i];
			console.log(item.val);
			item.left && newCheckArr.push(item.left);	
			item.right && newCheckArr.push(item.right);	
		}
		checkArr = newCheckArr;
	}
};
```

##### 4.反转链表

```typescript
#递归法:不断递归反转当前节点 head 的后继节点 next
var reverseList = function(head) {
    if(!head || !head.next) return head
    var next = head.next
    // 递归反转
    var reverseHead = reverseList(next)
    // 变更指针
    next.next = head
    head.next = null
    return reverseHead
};
```

##### 5.判断是否是平衡二叉树

```typescript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    // 遍历到底还没有发现高度差超过 1 的左右子树，那么这个子树肯定符合平衡二叉树的规范
    if (!root) {
        return true
    }
    // 判断左右子树的高度差，如果超过 1 那么立即返回 false
    if (Math.abs(getHeight(root.left) - getHeight(root.right)) > 1) {
        return false
    }
    // 分别递归左右子树
    return isBalanced(root.left) && isBalanced(root.right)
    // 获取某个子树的高度
    function getHeight (root) {
        if (!root) {
            return 0
        }
        return Math.max(getHeight(root.left), getHeight(root.right)) + 1
    }
};
```

5.环形链表

```typescript
#“快指针”总比“慢指针”快一步,快指针”追上了“慢指针”,证明是环形的.
var hasCycle = function(head) {
  if (!head) return false;
  let slow = head,
      fast = head;
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
};
```

##### 6.全排列问题1,2,3的所有集合(回溯算法)

```typescript
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
console.log(permute([1,2,3]));--> 1,2,3 1,3,2  2,1,3 2,3,1 3,1,2 3,2,1
#递归解析:
//dfs[0]选1,dfs[1]选2,dfs[2]选3,dfs[4]跳出,pop后回到dfs[1],选3,执行完跳出pop回到dfs[0].按图推测递归方式.
```

![aa061a6233fa2bd640b4e1416c12dceceb0c4b4e6f2610240740a3cb6ea1496c-微信截图_20200514183911](/Users/zhanghaibin/Documents/tongits/allworkspace/Typora/code/images/aa061a6233fa2bd640b4e1416c12dceceb0c4b4e6f2610240740a3cb6ea1496c-微信截图_20200514183911.png)

##### 7.括号生成:生成所有可能的并且 **有效的** 括号组合(回溯算法)

```typescript
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
"((()))","(()())","(())()","()(())","()()()"
```

##### 7.分割数组为连续子序列(贪心算法)

```typescript
#//1.统计所有数字出现的次数
//2.贪心获取数字并从map里减少次数.
//3.如果遇到降序数字或者下一数字比当前数字大于1,即不连续.则跳出.
//4.最终取完长度如果有小于3的则不满足条件,return false.
var isPossible = function(nums) {
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
};
console.log(isPossible2([1,2,3,3,4,4,5,5]))
输出:1,2,3,4,5  3,4,5 
1,2,3,3,4,5 ====> 1,2,3  3,4,5
```

