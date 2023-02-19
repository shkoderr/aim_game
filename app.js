//Создаём переменные
const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#ae7ec9', '#b90e72', '#0b2d93', '#0e8b5b', '#bcd30d', '#f48e1a', '#992e2e', '#00e7eb']
let time = 0
let score = 0


//Добавляем слушатели событий для элементов
startBtn.addEventListener('click', (event) => {
  event.preventDefault()     //отменили дефолтное поведение, чтобы при нажатии не добавлялся хэш в адресную строку
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if(event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', event => {
  if(event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})


//Создаём функции
function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if(time === 0) {
    finishGame()
  } else {
    let current = --time
  if (current < 10) {    //если время меньше 10 сек, будет отображаться ноль перед цифрой
    current = `0${current}`
  }
  setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Cчёт: <span class='primary'>${score}</span></h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const color = getRandomColor(colors)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = `${color}`

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}