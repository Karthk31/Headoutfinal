document.addEventListener('DOMContentLoaded', () => {
    const form = [...document.querySelector('.form').children];
    
    form.forEach((item, i) => {
        setTimeout(() => {
            item.style.opacity = 1;
        }, i * 100);
    });

    window.onload=()=>{
        if(sessionStorage.fullname){
            location.href='/'
        }
    }
    // Form validation
    const fullname = document.querySelector('.name');
    const email = document.querySelector('.email');
    const password = document.querySelector('.password');
    const submitBtn = document.querySelector('.submit-btn');
    
    if(fullname==null){
        submitBtn.addEventListener('click',()=>{
            fetch('/login-user',{
                method:'post',
                headers: new Headers({'Content-Type':'application/json'}),
                body: JSON.stringify({
                    email:email.value,
                    password:password.value
                })
            })
            .then(res=>res.json())
            .then((data) => {
                validateData(data);
            })
        })
    }
    else { // Check if fullname element exists
        submitBtn.addEventListener('click', () => {
            fetch('/register-user', {
                method: 'post',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify({
                    fullname: fullname.value, // Correct the key here
                    email: email.value,
                    password: password.value
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then((data) => {
               validateData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    }
});


const validateData=(data)=>{
    if(!data.name){
        alertBox(data);
    }else{
        sessionStorage.name=data.name;
        sessionStorage.email=data.email;
        location.href='/';
    }
}

const alertBox=(data)=>{
    const alertContainer=document.querySelector('.alert-box');
    const alertMsg=document.querySelector('.alert');
    alertMsg.innerHTML=data;

    alertContainer.style.top=`5%`;
    setTimeout(()=>{
        alertContainer.style.top=null;
    },5000);
}
