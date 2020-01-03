const $signupForm = document.querySelector(".sign-up")
const $errorMessage = document.querySelector(".error-message")
const $loginLink = document.querySelector(".login-link")
const BASE_URL = "http://localhost:3000"

localStorage.getItem("token") ? setLogout() : setLogin()

$signupForm.addEventListener("submit", signUp)

function signUp(event){
    event.preventDefault()
    
    const user = getUser(event.target)

    fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user }),
    }).then(checkForError)
    .then(redirectToLogin)
    .catch(showError)
}

function checkForError(response){
    return !response.ok && response.json()
        .then(({error}) => {
            throw new Error(error)
        })
}

function redirectToLogin(){
    window.location.href = "/login.html"
}

function showError(error){
    $errorMessage.textContent = error
}

function getUser(form){
    const formData = new FormData(form)
    return {
        username: formData.get("username"),
        password: formData.get("password"),
    }
}

function setLogin(){
    $loginLink.innerHTML = `<a href="/login.html">Login</a>`
}

function setLogout(){
    $loginLink.innerHTML = `<a href="#">Logout</a>`
    $loginLink.addEventListener("click", logout)
}

function logout(){
    localStorage.removeItem("token")
    window.location.reload()
}
