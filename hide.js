// hiding the code 

document.addEventListener("keydown", function (event){

    if (event.ctrlKey){
  
       event.preventDefault();
  
    }
  
    if(event.keyCode == 123){
  
       event.preventDefault();
  
    }
  
})

document.addEventListener('contextmenu', event => event.preventDefault())
