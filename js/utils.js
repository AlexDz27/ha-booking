function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleItems(arr) {
  var arrCopy = arr.slice();
  var resultArr = [];
  var initArrLength = arrCopy.length;
  for (var i = 0; i < initArrLength; i++) {
    var randIdx = getRandomInt(0, arrCopy.length - 1);
    var removedItem = arrCopy.splice(randIdx, 1).pop();

    resultArr.push(removedItem);
  }

  return resultArr;
}

function getArrRandomPart(arr) {
  var start = getRandomInt(0, arr.length - 1);
  var end = getRandomInt(start + 1, arr.length);

  return arr.slice(start, end);
}

function toArray(item) {
  return Array.prototype.slice.call(item);
}

function getSelectOptions(selectEl) {
  return selectEl.options;
}
function getSelectedOptionFromSelect(selectEl) {
  return selectEl.options[selectEl.selectedIndex];
}