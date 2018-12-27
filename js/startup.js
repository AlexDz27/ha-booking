var allNoticeInputEls = getNoticeInputEls();
var adForm = document.querySelector('.notice__form');

disableNoticeInputEls();


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

  var allInputs = toArray(noticeEl.querySelectorAll('input'));
  var allSelects = toArray(noticeEl.querySelectorAll('select'));
  var allBtns = toArray(noticeEl.querySelectorAll('button'));
  var allTextareas = toArray(noticeEl.querySelectorAll('textarea'));
  var inputsInMap = [].concat(
    toArray(document.querySelector('.map__filters-container').querySelectorAll('select')),
    toArray(document.querySelector('.map__filters-container').querySelectorAll('input'))
  );
  var allUserEls = [allInputs, allSelects, allTextareas, allBtns, inputsInMap];

  allUserEls = [].concat.apply([], allUserEls);

  return allUserEls;
}