const input = document.querySelector('input')
const btn = document.querySelector('button')
const images = document.querySelector('.images')
const btnLoadMore = document.querySelector('#btnLoadMore')

let offset = 0
let counter = 0

let getGiphImage = (searchInput, offset) => {

    const giphy_key = ENV['MY_GIPHY_API']
    
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${giphy_key}&q=&limit=10&offset=${offset}&rating=G&lang=en&q=${searchInput}`).then( (response) => {
        
    let searchResults = response.data.data
        
    searchResults.forEach(item => {
        imgUrl = item.images.downsized_medium.url
        imgElem = document.createElement('img')
        images.appendChild(imgElem)
        imgElem.src = imgUrl    
        })
    })
}

btnLoadMore.addEventListener('click', function(e) {
    e.preventDefault()
    offset += 10;
    getGiphImage(input.value, offset)
})

btn.addEventListener('click', function(e) {
    e.preventDefault()
    images.innerHTML = ''
    getGiphImage(input.value)
    input.focus()
})

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (counter < 4) {
            offset += 10
            counter += 1
            getGiphImage(input.value, offset)
        } else {
            btnLoadMore.style.display = "block";
        }
    }
};