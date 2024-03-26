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

// player.SetVar('curSlide_2', 3);
// player.SetVar('arrSlides_2', '1_1_1_1_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0');
// player.SetVar('maxSlide_2', 20);

var currentSlide_2 = player.GetVar('curSlide_2');
var maxSilde_2 = player.GetVar('maxSlide_2');
//полученная из артикулейта строка просмотренных слайдов
var arrSlides_2 = player.GetVar('arrSlides_2');
//преобразованная в массив строка просмотренных слайдов
var arrayarrSlides_2 = arrSlides_2.split('_');
var elementNode = document.querySelectorAll('.element');

setElementsBehavior();
modarrSlides_2();
setcurrentSlide_2();
setViewedSlides();

// Изменяем arrSlides_2 и сразу записываем обратно в артикулейт
function modarrSlides_2() {
  arrayarrSlides_2[player.GetVar('curSlide_2')] = '1';
  player.SetVar('arrSlides_2', arrayarrSlides_2.join('_'));
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
  for (var i = 0, len = arrayarrSlides_2.length; i < len; i++) {
    var elem = $('[data-slide =' + i + ']');

    arrayarrSlides_2[i] == '1'
      ? $(elem).addClass('completed')
      : $(elem).addClass('disabled');
  }
}

// Установка текущего слайда
function setcurrentSlide_2() {
  if (currentSlide_2 > maxSilde_2) return false;
  var elem = $('[data-slide =' + currentSlide_2 + ']');
  $(elem).addClass('current');
}

function goToSlide(context) {
  var targetSlide_2 = context.getAttribute('data-slide');
  if (targetSlide_2) {
    player.SetVar('pauseTimeline', false);
    player.SetVar('targetSlide_2', targetSlide_2);
  }
}
