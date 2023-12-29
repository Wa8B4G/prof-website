const mylog = document.querySelector('.mylog');
const myform = document.querySelector('.myform');

mylog.addEventListener('click', myFunc);
function myFunc(e){
myform.style.display = 'block';
}
setInterval(function(){
    myform.style.display = 'none';
    myform.style.transition = '2s';
},12000);