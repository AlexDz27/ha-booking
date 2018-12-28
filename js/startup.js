;(function () {

  window.startup = {
    isAppActivated: false,

    activateApp: activateApp,
    enableNoticeInputEls: enableNoticeInputEls,
    disableNoticeInputEls: disableNoticeInputEls,
  };

  var allNoticeInputEls = getNoticeInputEls();
  var adForm = document.querySelector('.notice__form');

  disableNoticeInputEls();


  function activateApp() {
    if (window.startup.isAppActivated) {
      return;
    }

    enableNoticeInputEls();

    window.map.enableMap();

    window.map.renderAllPins();
    window.map.showAdCardOnPinClick();

    window.startup.isAppActivated = true;
  }

  function disableNoticeInputEls() {
    adForm.classList.add('notice__form--disabled');
    allNoticeInputEls.forEach(function (el) {
      el.disabled = true;
    });
  }

  function enableNoticeInputEls() {
    adForm.classList.remove('notice__form--disabled');
    allNoticeInputEls.forEach(function (el) {
      el.disabled = false;
    });
  }

  function getNoticeInputEls() {
    var noticeEl = document.querySelector('.notice');

    var allInputs = window.utils.arr.toArray(noticeEl.querySelectorAll('input'));
    var allSelects = window.utils.arr.toArray(noticeEl.querySelectorAll('select'));
    var allBtns = window.utils.arr.toArray(noticeEl.querySelectorAll('button'));
    var allTextareas = window.utils.arr.toArray(noticeEl.querySelectorAll('textarea'));
    var inputsInMap = [].concat(
      window.utils.arr.toArray(document.querySelector('.map__filters-container').querySelectorAll('select')),
      window.utils.arr.toArray(document.querySelector('.map__filters-container').querySelectorAll('input'))
    );
    var allUserEls = [allInputs, allSelects, allTextareas, allBtns, inputsInMap];

    allUserEls = [].concat.apply([], allUserEls);

    return allUserEls;
  }

})();
