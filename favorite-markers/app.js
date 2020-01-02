const BASE_URL = "http://localhost:3000"
const $markers = document.querySelector(".marker-list")
const $errorMessage = document.querySelector(".error-message")

fetch(`${BASE_URL}/markers`)
    .then(response => response.json())
    .then(({ markers }) => {
        markers.map(marker => {
            const $li = document.createElement("li")
            $li.innerHTML = `
                <div>
                    <h3>${marker.label}</h3>
                    <img src="/images/${marker.image_url}" alt="${marker.label}" />
                </div>
            `
            return $li
        }).forEach($marker => $markers.append($marker))
    }).catch(error => {
        $errorMessage.textContent = error.message
    })

$markers.addEventListener("click", event => {
    if (event.target.tagName !== "UL"){
        const element = findNearestLi(event.target)
        element.classList.toggle("active")
    }
})

function findNearestLi(element){
    return element.tagName == "LI"
        ? element
        : findNearestLi(element.parentNode)
}
