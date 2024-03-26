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

// Скроллбар
if (window.jQuery) {
  (function ($) {
    $(window).on('load', function () {
      $('.scroll-container').mCustomScrollbar({
        theme: 'my-theme',
        axis: 'y',
        setWidth: 654,
        setHeight: 458,
        alwaysShowScrollbar: 0,
        scrollButtons: {
          enable: false,
        },
        autoDraggerLength: false,
        mouseWheel: {
          scrollAmount: 100,
        },
        callbacks: {
          alwaysTriggerOffsets: false,
        },
      });
    });
  })(jQuery);
}

var player = parent.GetPlayer ? parent.GetPlayer() : new MimicPlayer();

//Тестовые данные

// player.SetVar('curSlide', 3);
// player.SetVar('arrSlides', '1_1_1_1_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0');
// player.SetVar('maxSlide', 20);

var currentSlide = player.GetVar('curSlide');
var maxSilde = player.GetVar('maxSlide');
//полученная из артикулейта строка просмотренных слайдов
var arrSlides = player.GetVar('arrSlides');
//преобразованная в массив строка просмотренных слайдов
var arrayArrSlides = arrSlides.split('_');
var elementNode = document.querySelectorAll('.element');

setElementsBehavior();
modArrSlides();
setCurrentSlide();
setViewedSlides();

// Изменяем arrSlides и сразу записываем обратно в артикулейт
function modArrSlides() {
  arrayArrSlides[player.GetVar('curSlide')] = '1';
  player.SetVar('arrSlides', arrayArrSlides.join('_'));
}

// Установка всем пунктам оглавления goToSlide по клику
function setElementsBehavior() {
  for (var i = 0, len = elementNode.length; i < len; i++) {
    elementNode[i].addEventListener('click', function (e) {
      goToSlide(e.target);
    });
  }
}

// Установка просмотренных слайдов
function setViewedSlides() {
  for (var i = 0, len = arrayArrSlides.length; i < len; i++) {
    var elem = $('[data-slide =' + i + ']');

    arrayArrSlides[i] == '1'
      ? $(elem).addClass('completed')
      : $(elem).addClass('disabled');
  }
}

// Установка текущего слайда
function setCurrentSlide() {
  if (currentSlide > maxSilde) return false;
  var elem = $('[data-slide =' + currentSlide + ']');
  $(elem).addClass('current');
}

function goToSlide(context) {
  var targetSlide = context.getAttribute('data-slide');
  if (targetSlide) {
    player.SetVar('pauseTimeline', false);
    player.SetVar('targetSlide', targetSlide);
  }
}
