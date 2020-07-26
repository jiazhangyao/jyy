function rot13(str) {
    var new_arr=[];
   for(var i=0;i<str.length;i++){
      if(str.charCodeAt(i)<65||str.charCodeAt(i)>90){
        new_arr.push(str.charAt(i));
      }else if(str.charCodeAt(i)>77){
        new_arr.push(String.fromCharCode(str.charCodeAt(i)-13));
      }else{
        new_arr.push(String.fromCharCode(str.charCodeAt(i)+13));
      }
    }
    return new_arr.join("");
 }
 const t = rot13("SERR PBQR PNZC");

//  console.log(t)
const str ='A'
for (let i = 0; i < str.length; i ++) {
    console.log(str.charCodeAt(i));
    
}

// console.log(String.fromCharCode(65, 68, 67));

