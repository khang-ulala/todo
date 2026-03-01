// tham chieu doi tuong login
const loginbt = document.getElementById("login")
// tham chieu doi tuong signup
const signupbt = document.getElementById("signup")
document.addEventListener("DOMContentLoaded", function(){
    loginbt.addEventListener("click", login)
    signupbt.addEventListener("click", signup)
})

function login(){
    window.location.href = '/login_rq'
    fetch ('/login_rq', {method:"GET",})
    .then(Response =>{window.location.href='/login_rq'})
    .catch(error =>{console.error("Error:", error)})
}

function signup(){
    window.location.href = '/signup_rq'
    fetch ('/signup_rq', {method:"GET",})
    .then(Response =>{window.location.href='/signup_rq'})
    .catch(error =>{console.error("Error:", error)})
}