const box=document.querySelector(".box input");
const btn=document.querySelector(".box button");
const todo=document.querySelector(".todolist");
const btndelete=document.querySelector(".last button");

//keyup event
box.onkeyup = ()=>{
  let inputvalue=box.value;
  if(inputvalue.trim() != 0){
    btn.classList.add("active")
  }else{
    btn.classList.remove("active")
  }
}
showvalue();

//user click the btn
btn.onclick= ()=> {
  var inputvalue=box.value;
  let storagedata=localStorage.getItem("localtask");
  if (storagedata == null) {
    liarray=[];
    
  }else{
    liarray=JSON.parse(storagedata);
  }
  liarray.push(inputvalue);
  localStorage.setItem("localtask",JSON.stringify(liarray));
  showvalue()
  btn.classList.remove("active");
  
}

function showvalue() {
  let storagedata = localStorage.getItem("localtask");
  if (storagedata == null) {
    liarray = [];
  } else {
    liarray = JSON.parse(storagedata);
  }
  const pendingtask = document.querySelector(".pending");
  pendingtask.textContent = liarray.length; //passing the array length in pendingtask
  if (liarray.length > 0) { //if array length is greater than 0
    btndelete.classList.add("active"); //active the delete button
  } else {
    btndelete.classList.remove("active"); //unactive the delete button
  }
  let newlitag = "";
  liarray.forEach((element, index) => {
    newlitag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todo.innerHTML = newlitag; //adding new li tag inside ul tag
  box.value = ""; //once task added leave the input field blank
}

//delete task
function deleteTask(index){
  storagedata=localStorage.getItem("localtask");
  liarray=JSON.parse(storagedata)
  liarray.splice(index,1);
  localStorage.setItem("localtask",JSON.stringify(liarray));
  showvalue();
}

//delete all
btndelete.onclick=()=>{
  liarray = []
  localStorage.setItem("localtask", JSON.stringify(liarray));
  showvalue();
 
}

