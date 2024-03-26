// Имитатор плеера Articulate
function MimicPlayer() {
  this.storage = {};

  this.GetVar = function (variable) {
    if (typeof variable != 'string') {
      throw new Error('Некорректное обращение');
    }

    if (this.storage[variable] != undefined) {
      return this.storage[variable];
    } else {
      throw new Error('Переменная ' + variable + ' не существует');
    }
  };
  this.SetVar = function (variable, newValue) {
    if (this.storage[variable] != undefined) {
      var oldType = typeof this.storage[variable],
        newType = typeof newValue;

      if (newType != oldType) {
        throw new Error(
          'Попытка присвоить переменной типа ' + oldType + ' тип ' + newType
        );
        return false;
      }
    }
    this.storage[variable] = newValue;
    return true;
  };
  this.DelVar = function (variable) {
    if (this.storage[variable]) {
      delete this.storage[variable];
      return true;
    } else {
      throw new Error('Переменная ' + variable + ' не существует');
    }
  };
}

var player = parent.GetPlayer ? parent.GetPlayer() : new MimicPlayer();

//Тестовые данные
// player.SetVar('curSlide', 6);
// player.SetVar('maxSlide', 15);

var currentSlide = player.GetVar('curSlide');
var maxSilde = player.GetVar('maxSlide');

var progressContainer = document.querySelector('.progress-container');

function ProgressPoint(container) {
  this.container = container;
  this.createPoint();
}

ProgressPoint.prototype.createPoint = function () {
  var point = document.createElement('div');
  point.classList.add('progress-container__point');
  this.container.appendChild(point);
};

document.addEventListener('DOMContentLoaded', function () {
  for (var i = 1; i <= maxSilde; i += 1) {
    new ProgressPoint(progressContainer);
  }

  var points = document.querySelectorAll('.progress-container__point');
  var indexCurrentPoint = maxSilde - currentSlide;
  var currentPoint = points[indexCurrentPoint];
  currentPoint.classList.add('progress-container__point--current');
});
