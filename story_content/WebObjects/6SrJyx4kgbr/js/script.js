sortController = {
  sendArtVarCorrect: function () {
    return 'passed';
  },

  sendArtVarFailed: function () {
    return 'failed';
  },

  getArtVar: function () {
    return 'task_sortable';
  },

  cardOrderArray: '',

  correctCardOrder: '',

  getData: function () {
    var url = './js/data.json';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    var data = JSON.parse(xhr.responseText);
    return data;
  },

  createMarkUp: function () {
    var dataQuestions = sortController.getData();
    var containerOrder = document.querySelector('#order');
    var containetQuestions = document.querySelector('#sortable');
    var tempCorrectCardOrder = [];
    dataQuestions.forEach(function (question) {
      var id = question.id;
      var text = question.caption;
      containerOrder.insertAdjacentHTML('beforeend', '<span>' + id + '</span>');
      containetQuestions.insertAdjacentHTML(
        'beforeend',
        '<li class="ui-state-default" id="card' + id + '">' + text + '</li>'
      );
      tempCorrectCardOrder.push(id);
    });
    sortController.correctCardOrder = tempCorrectCardOrder.join('_');
  },

  shuffleElem: function () {
    var parent = $('#sortable'),
      elements = parent.children();

    while (elements.length) {
      parent.append(
        elements.splice(Math.floor(Math.random() * elements.length), 1)[0]
      );
    }
  },

  init: function () {
    this.createMarkUp();
    this.shuffleElem();

    $('#sortable').sortable({
      placeholder: 'marnie',
      axis: 'y',
      cursor: 'pointer',
      revert: 100,
      scroll: false,
      tolerance: 'pointer',
      update: function (event, ui) {
        var orderArray = $('#sortable').sortable('toArray');

        orderArray.forEach(function (item, i, arr) {
          item = item.slice(-1);
          orderArray[i] = item;
        });

        sortController.cardOrderArray = orderArray.join('_');
      },
    });
  },

  checkCorrect: function () {
    return this.cardOrderArray === this.correctCardOrder
      ? this.sendArtVarCorrect()
      : this.sendArtVarFailed();
  },

  addClass: function (elem, classStyle) {
    elem.classList.add(classStyle);
  },

  markCorrect: function () {
    var elemsSort = document.querySelectorAll('#sortable li');
    var correctOrder = this.correctCardOrder.split('_');
    elemsSort.forEach(function (elem, index) {
      return elem.id.slice(-1) === correctOrder[index]
        ? sortController.addClass(elem, 'correct')
        : sortController.addClass(elem, 'wrong');
    });
  },

  answerTask: function () {
    var player = parent.GetPlayer();
    player.SetVar(this.getArtVar(), this.checkCorrect());
    this.markCorrect();
  },

  reload: function () {
    var elemsSort = document.querySelectorAll('#sortable li');
    elemsSort.forEach(function (elem) {
      elem.classList.remove('correct');
      elem.classList.remove('wrong');
    });
    this.shuffleElem();
  },
};

document.addEventListener('DOMContentLoaded', function () {
  (function () {
    sortController.init();
  })();
});
