function myFunction(a, b) {
  let ans = true;
  const mappedAppts = Object.values(a).forEach(() => {
    
    if (a[b] === undefined || a[b] === null) {
      ans = false;
    }
  })
  return ans;
}

console.log(myFunction({a:1,b:2,c:3},'b'));
console.log(myFunction({x:'a',y:null,z:'c'},'y'));
// console.log(myFunction(myFunction([99, 1, 1])));
