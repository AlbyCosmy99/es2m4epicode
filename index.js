var songPlaying = false
var currentAudio = null
var currentMp3 = null

async function search() {
    let cards = document.querySelectorAll('div.mainPage div.card')
    cards.forEach(card => {
        card.remove()
    })

    let text = document.querySelector('input.search').value
    document.querySelector('#searchResults').className = 'd-block'

    let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${text}`)
    let json = await response.json()
    let data = json.data

    let mainPage = document.querySelector('div.mainPage')

    mainPage.innerHTML += data.map(elem => {
        return `
        <div class="card mb-4 mt-4 mr-4">
            <div class="d-flex justify-content-between">
                <img onclick="playSong('${elem.preview}')" src="${elem.album.cover}" class="card-img-top" alt="${elem.artist.name}'s song" style="cursor: pointer;">
                <img src="${elem.artist.picture}"/>
            </div>
            <div class="card-body">
                <h5 class="card-title">${elem.title}</h5>
                <div class="d-flex justify-content-between">
                    <h6>${elem.album.title}</h6>
                    <h6>${elem.artist.name}</h6>
                </div>
                <div class="d-flex justify-content-between">
                    <h6>Duration: ${elem.duration}s</h6>
                </div>
            </div>
        </div>
        `
    }).join('')
}

function playSong(mp3Song) {
    if(mp3Song !== currentMp3) {
        if(currentAudio) {
            currentAudio.pause();
            currentAudio = null
        }
        songPlaying = false
    }
    currentMp3 = mp3Song
    if(!songPlaying) {
        if(!currentAudio) {
            var audio = new Audio(currentMp3);
            currentAudio = audio
        }
        currentAudio.play();
        document.querySelector('.playBtn').style.display = 'None' 
        document.querySelector('.pauseBtn').style.display = 'inline-block' 
        songPlaying = true
    }
    else {
        currentAudio.pause();
        document.querySelector('.playBtn').style.display = 'inline-block' 
        document.querySelector('.pauseBtn').style.display = 'none' 
        songPlaying = false
    }
}

function pauseSong() {
    currentAudio.pause();
    songPlaying = false
    document.querySelector('.playBtn').style.display = 'inline-block' 
    document.querySelector('.pauseBtn').style.display = 'none' 
}

function startSong() {
    if(currentAudio) {
        currentAudio.play();
        songPlaying = true
        document.querySelector('.playBtn').style.display = 'None' 
        document.querySelector('.pauseBtn').style.display = 'inline-block' 
    } 
}