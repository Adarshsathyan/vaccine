

let header=document.querySelector('#header')
window.addEventListener('scroll',()=>{
    if(window.pageYOffset>100){
        header.classList.add('shadow');
        header.style.backgroundColor="#FFF";
    }else{
        header.classList.remove('shadow')
        header.style.backgroundColor="";
    }
})