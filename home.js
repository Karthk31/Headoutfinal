const greeting =document.querySelector('.greeting');



window.onload = () => {
  if (!sessionStorage.name) {
    location.href = '/login';
  } else {
    greeting.innerHTML = `Hello, ${sessionStorage.name}`; // Change "fullname" to "name"
  }
}


const logOut=document.querySelector('.logout');

logOut.onclick=()=>{
    sessionStorage.clear();
    location.reload();
}