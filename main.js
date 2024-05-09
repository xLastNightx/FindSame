(()=>{
// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

// создаем начальную разметку
  function createBaseForGame() {
    // создание основы
    const container = document.querySelector('#container');

    // список
    let list = document.createElement('ul');
    list.classList.add('list__group', 'row');
    list.id = 'game';

    container.append(list);

    return {
      container,
      list,
    };
  }
  createBaseForGame()

  // создание классов
  class Card { // это шаблон, по которому потом будем создавать много копий
    _open = false
    _success = false

    constructor(container, number, action) {
      this.card = document.createElement('li') // через this обращаемся к card
      this.card.classList.add('list__card', 'd-flex', 'justify-content-center', 'align-items-center')
      this.card.textContent = number
      this.number = number

    this.card.addEventListener('click', () => { // так как this, обращается к элементу, на который кликают, нам нужна не просто функция, а стрелочная функция
      if(this.open == false && this.success == false) { // условие
        this.open = true
        action(this) // передаем всю карточку со свойствами
      }
    })
    container.append(this.card)
    }
    set open(value) { // добавляет класс
      this._open = value
      value ? this.card.classList.add('open') : this.card.classList.remove('open')
      /*if (value) { // value == true
        this.card.classList.add('open')
      } else {
        this.card.classList.remove('open')
      } */
    }
    get open() {
      return this._open
    }
    set success(value) {
      this._success = value
      value ? this.card.classList.add('success') : this.card.classList.remove('success')
    }
    get success() {
      return this._open
    }
  }

  //перемешка массива цифр
  function startGame(container, cardsCount) {
    // создание поля
    cardsCount = cardsCount;
    let randomNumbers = [],
        cardsArray = [],
        firstCard = null,
        secondCard = null

        // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
        function createNumbersArray(count) {
          for (count = 1; count <= cardsCount; count++) {
            randomNumbers.push(count);
            randomNumbers.push(count);
          }
          console.log(randomNumbers);
        }

      // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

        function shuffle(arr) {
          randomNumbers = randomNumbers.map(j => [Math.random(), j]).sort().map(i => i[1]);
          console.log(randomNumbers); // map вышагивает по каждому элементу массива и назначает ему рандомное число от 0 до 1, затем это все сортеруется по этому первому (рандомному) числу и выводится только элемент массива (без назначеного ему рандомного номера)
        }
        shuffle(createNumbersArray());

    for(const cardNumber of randomNumbers) {
        cardsArray.push(new Card(container, cardNumber, flip))
    }

    // механика вся
    function flip(card) {
      if(firstCard !== null && secondCard !== null) {
          if(firstCard.number != secondCard.number) {
              firstCard.open = false
              secondCard.open = false
              firstCard = null
              secondCard = null
          }
      }

      if(firstCard == null) {
          firstCard = card
      } else {
          if(secondCard == null) {
              secondCard = card
          }
      }

      if(firstCard !== null && secondCard !== null) {
          if(firstCard.number == secondCard.number) {
              firstCard.success = true
              secondCard.success = true
              firstCard = null
              secondCard = null
          }
      }

      // конец и запуск новой игры
      if(document.querySelectorAll('.list__card.success').length == randomNumbers.length) {
          alert('Победа!')
          let button = document.createElement('button');
          button.classList.add('game__btn');
          button.textContent = "Заново"
          let cont = document.getElementById('container');
          cont.append(button);
          button.addEventListener('click', function() {
            container.innerHTML = ''
            randomNumbers = []
            cardsArray = []
            firstCard = null
            secondCard = null

            startGame(container, cardsCount)
            button.remove();
          })
      }
    }
  }
  startGame(document.getElementById('game'), 4);
})();
