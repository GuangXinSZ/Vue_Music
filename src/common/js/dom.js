export function addClass(el,className){
  if(hasClass(el,className)){
    return
  }
  let newclass = el.className.split(' ');
   newclass.push(className)
   el.className = newclass.join(' ');
}
/*获取ClassName */
export function hasClass(el,className){
  let reg = new RegExp('(^|\\$)' + className + '(\\s|$)');
  return reg.test(el.className)
}
export function getData(el,name,val){
  const prefix = 'data-';
  name = prefix + name;
  if(val){
    return el.setAttribute(name,val)
  }else{
    return el.getAttribute(name);
  }
}