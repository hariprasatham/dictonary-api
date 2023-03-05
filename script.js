const input = document.getElementById("input")
const infoText = document.getElementById("info-text")
const meaningContainer = document.getElementById("meaning-container")
const wordEl = document.getElementById("word")
const meaningEl = document.getElementById("meaning")
const audio = document.getElementById("audio")

async function fetchAPI(word){
    try {
        
        infoText.style.display = "block"
        meaningContainer.style.display = "none"
        infoText.innerText = `searching the meaning of a "${word}"`
        const APIURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const response = await fetch(APIURL).then((res)=>res.json())
        if(response.title){
            meaningContainer.style.display = "block"
            infoText.style.display = "none"
            wordEl.innerText = word
            meaningEl.innerText = "NOT AVAILABLE"
            audio.style.display = "none"
        }
        else{
            audio.style.display = "inline-flex"
            infoText.style.display = "none"
            meaningContainer.style.display = "block"
            wordEl.innerText = response[0].word
            meaningEl.innerText = response[0].meanings[0].definitions[0].definition
            audio.src = response[0].phonetics[1].audio
            }
        
    } catch (error) {
        infoText.innerText = `Try again or check your internet connection`
    }
}


input.addEventListener("keypress", function(event){
    if(event.target.value && event.key == "Enter")
    {
        fetchAPI(event.target.value)
    }
})