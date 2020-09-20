import { randomInteger, getCoords, disableSelection } from './helpers';

const field = document.querySelector('.field');
const score = document.querySelector('.score__value');
const gate = document.querySelector('.field__gate');
const leftGoalsList = document.querySelector('.info__goal--left .info__list');
const rightGoalsList = document.querySelector('.info__goal--right .info__list');
const fieldW = field.offsetWidth;
const fieldH = field.offsetHeight;
const gateW = gate.offsetWidth;
const gateH = gate.offsetHeight;
const ballW = 42;

const scoreValue = {
  left: 0,
  right: 0,
};

score.innerText = scoreValue.left + ' : ' + scoreValue.right;

const balls = [['div', 'blue'],
  ['p', 'pink'],
  ['b', 'brown'],
  ['a', 'purple'],
  ['i', 'orange'],
  ['li', 'grey'],
  ['ol', 'green'],
  ['ul', 'yellow'],
  ['span', 'black']];

const minX = gateW;
const maxX = fieldW - gateW - ballW;
const minY = 0;
const maxY = fieldH - ballW;

balls.forEach(el => {
  const element = document.createElement(el[0]);

  element.classList.add('ball', 'field__ball');
  element.innerText = el[0].toUpperCase();
  field.append(element);
  element.style.position = 'absolute';
  element.style.backgroundColor = el[1];

  const newX = randomInteger(minX, maxX);
  const newY = randomInteger(minY, maxY);

  element.style.top = newY + 'px';
  element.style.left = newX + 'px';
});

const ballList = document.querySelectorAll('.field__ball');

ballList.forEach(ball => {
  ball.onmousedown = function(event) {
    if (event.target.classList.contains('ball--dropped')) {
      return;
    }
    ball.style.zIndex = 1000;

    const { top, left } = getCoords(field);

    const shiftX = event.clientX - ball.getBoundingClientRect().left;
    const shiftY = event.clientY - ball.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      ball.style.left = pageX - left - shiftX + 'px';
      ball.style.top = pageY - top - shiftY + 'px';

      if (ball.getBoundingClientRect().left < left) {
        ball.style.left = 0 + 'px';
      };

      if (ball.getBoundingClientRect().top < top) {
        ball.style.top = 0 + 'px';
      };

      if (ball.getBoundingClientRect().left > left + fieldW - ball.offsetWidth) {
        ball.style.left = fieldW - ball.offsetWidth + 'px';
      };

      if (ball.getBoundingClientRect().top > top + 640 - ball.offsetHeight) {
        ball.style.top = 640 - ball.offsetHeight + 'px';
      };
    };

    moveAt(event.pageX, event.pageY);

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    };
    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function() {
      if (ball.getBoundingClientRect().left <= left + 150 - ball.offsetWidth
        && ball.getBoundingClientRect().top >= top + 129
        && ball.getBoundingClientRect()
          .top <= top + 129 + 382 - ball.offsetHeight) {
        ball.classList.add('ball--dropped');
        goal('left');
        addGoalToTheList('left');
      }

      if (ball.getBoundingClientRect().left >= left + 1200 - 150
      && ball.getBoundingClientRect().top >= top + 129
      && ball.getBoundingClientRect()
        .top <= top + 129 + 382 - ball.offsetHeight) {
        ball.classList.add('ball--dropped');
        goal('right');
        addGoalToTheList('right');
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null;
    };
  };

  ball.ondragstart = function() {
    return false;
  };

  function goal(side) {
    scoreValue[side]++;
    score.innerText = scoreValue.left + ' : ' + scoreValue.right;
  }

  function addGoalToTheList(side) {
    const newElement = ball.cloneNode(true);

    newElement.style.position = 'static';

    const listItem = document.createElement('li');

    listItem.classList.add('info__item');
    listItem.append(newElement);

    switch (side) {
      case 'left':
        leftGoalsList.append(listItem);
        break;
      case 'right':
        rightGoalsList.append(listItem);
        break;
      default:
        break;
    }
  }
});

disableSelection(document.body);
