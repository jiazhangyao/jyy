
var twoSum = function(nums: number[], target: number) {
    if(!nums.length) return [];
    let num = nums.slice(0);
    nums.sort((x,y) => x-y);
    let l = 0,r = nums.length-1;
    while(l < r){
        if(nums[l] + nums[r] === target) break;
        else if(nums[l] + nums[r] < target){
            l++;
        }else{
            r--;
        }
    }
    // l = num.indexOf(nums[l]);
    // r = num.indexOf(nums[r]) === l ? num.indexOf(nums[r],l+1) : num.indexOf(nums[r])
    return [l,r];
};

console.log(twoSum([1, 2, 3, 4], 5));
