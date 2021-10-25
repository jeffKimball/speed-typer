const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
// init word
let randomWord
// init score
let score = 0
// init time
let time = 10

// set difficulty to  value in local storage or default to medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

// set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];

// focus on input area on load
text.focus()

// start counting down
const timeInterval = setInterval(updateTime, 1000)

// generate random word
function getRandomWord(){
    return words[Math.floor(Math.random()* words.length)]
}

// add word to DOM
function addWordToDOM(){
    randomWord= getRandomWord()
    word.innerHTML = randomWord
}

function updateScore(){
    score++
    scoreEl.innerHTML = score
}

// update the time
function updateTime(){
    time--
    timeEl.innerHTML = time + 's'

    if(time === 0){
        clearInterval(timeInterval)
        //end game
        gameOver()
    }
}

// end the game - show end screen
function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score: ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `
    endgameEl.style.display = 'flex'
}

addWordToDOM()

// Typing event listener
text.addEventListener('input', e =>{
    const insertedText = e.target.value
    
    if(insertedText === randomWord){
        addWordToDOM()
        updateScore()

        //clear input area
        e.target.value = ''

        if(difficulty === 'hard'){
            time += 1
        }else if (difficulty === 'medium'){
            time += 2
        }else {
            time += 3
        }

        updateTime()
    }
})

// settings button action
settingsBtn.addEventListener('click', () =>{
    settings.classList.toggle('hide')
})

// select setting
settingsForm.addEventListener('change', e =>{
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
})