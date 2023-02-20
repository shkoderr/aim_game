//Создаём переменные
const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen') //массив из 3-х наших экранов
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#ae7ec9', '#b90e72', '#0b2d93', '#0e8b5b', '#bcd30d', '#f48e1a', '#992e2e', '#00e7eb']
let time = 0
let score = 0


//Добавляем слушатели событий для элементов
startBtn.addEventListener('click', (event) => {
  event.preventDefault()     //отменили дефолтное поведение, чтобы при нажатии не добавлялся хэш в адресную строку
  screens[0].classList.add('up')  //перевернули на следующую страницу 
})

timeList.addEventListener('click', (event) => {
  if(event.target.classList.contains('time-btn')) {  //если мы нажали на отдельную кнопку..
    time = parseInt(event.target.getAttribute('data-time')) //получим атрибут, который равен времени в строчном формате, поэтому парсим его в число
    screens[1].classList.add('up')  //снова перевернули на следующую страницу 
    startGame()  //начинаем игру
  }
})

//Обработаем нажатие по доске:
board.addEventListener('click', event => {  
  if(event.target.classList.contains('circle')) {  //если попали в кружок..
    score++                                        //добавляем к счёту 1 очко
    event.target.remove()                          //удаляем кружок
    createRandomCircle()                           //создаём новый рандомный кружок
  }
})


//Создаём функции
function startGame() {
  setInterval(decreaseTime, 1000);      //счётчик срабатывающий каждую секунду
  createRandomCircle()                  //создаём рандомный кружок
  setTime(time)                         //устанавливаем время в зав-ти от выбранного игроком
}

function decreaseTime() {              //наш счётчик
  if(time === 0) {                     //если время ноль, то финишируем игру
    finishGame()
  } else {
    let current = --time              //иначе уменьшаем на 1 значение наше время
  if (current < 10) {    //если время меньше 10 сек, будет отображаться ноль перед цифрой
    current = `0${current}`
  }
  setTime(current)                    //устанавливаем наше время, функция ниже..
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`   //добавляем в наш спан со временем динамическое значение, value = current из прошлой функции
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')   //убираем наш экран с временем
  board.innerHTML = `<h1>Cчёт: <span class='primary'>${score}</span></h1>` //выводим на доску спан со счётом
}

function createRandomCircle() {
  const circle = document.createElement('div')  //создаём див, в который положим кружок
  const size = getRandomNumber(10, 60)
  const color = getRandomColor(colors)
  const {width, height} = board.getBoundingClientRect() //возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим). Результатом является самый маленький прямоугольник, в котором содержится весь элемент
  const x = getRandomNumber(0, width - size)    //задаём рандомные координаты, вычитаем размер, чтобы не выходил за рамки нашей доски
  const y = getRandomNumber(0, height - size)   //задаём рандомные координаты, вычитаем размер, чтобы не выходил за рамки нашей доски

  circle.classList.add('circle')      //добавляем диву класс кружочка
  circle.style.width = `${size}px`    //выставляемм ширину и высоту кружочка
  circle.style.height = `${size}px`   //выставляемм ширину и высоту кружочка
  circle.style.top = `${y}px`         //выставляем его положение на доске
  circle.style.left = `${x}px`        //выставляем его положение на доске
  circle.style.background = `${color}`//выставляем рандомный цвет кружочку

  board.append(circle)                //после всех манипуляций добавляем кружочек к доске
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)  //рандомизируем значения для размеров и координат кружочка, 60 - 10 + 10 = 60 * рандомное число и округлить
}

function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]  //рандомизируем наш массив с цветами
}


//Создадим функцию, которая будет автоматически нажимать на появляющиеся кружочки
function winTheGame() {
  function kill() {
    const circle = document.querySelector('.circle')
    if (circle) {
      circle.click()           //вызываем событие клика
    } 
  }
  setInterval(kill, 42);
}