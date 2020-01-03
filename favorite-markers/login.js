const $loginForm = document.querySelector(".login")
const $errorMessage = document.querySelector(".error-message")
const BASE_URL = "http://localhost:3000"

const token = localStorage.getItem("token")
    ? `bearer ${localStorage.getItem("token")}`
    : null

$loginForm.addEventListener("submit", login)

function login(event){
    event.preventDefault()
    
    const user = getUser(event.target)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user }),
    }

    fetch(`${BASE_URL}/login`, options)
        .then(checkForError)
        .then(setToken)
        .then(redirectToIndex)
        .catch(showError)
}

function getUser(form){
    const formData = new FormData(form)
    return {
        username: formData.get("username"),
        password: formData.get("password"),
    }
}

function checkForError(response){
    return !response.ok 
        ? response.json().then(({error}) => {
            throw new Error(error)
        })
        : response.json()
}

function setToken({ token }){
    localStorage.setItem("token", token)
}

function redirectToIndex(){
    window.location.href = "/"
}

function showError(error){
    $errorMessage.textContent = error
}

function setLogin(){
    $loginLink.innerHTML = `
        <a href="/login.html">Login</a>
    `
}

function setLogout(){
    $loginLink.innerHTML = `
        <a href="#">Logout</a>
    `
    $loginLink.addEventListener("click", logout)
}

function logout(){
    localStorage.removeItem("token")
    window.location.reload()
}
