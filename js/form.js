;(function () {

  var form = document.querySelector('.notice__form');
  var errorsList = null;
  var clientErrors = {
    allFeaturesNotSelected: {
      value: false,
      msg: 'Выберите хотя бы одно удобство',
      elSelector: '.notice-form__features'
    }
  };
  var capacityToMaxGuestsMap = {
    1: 0,
    2: 1,
    3: 2,
    100: 3
  };

  var roomsNumberSelect = document.querySelector('.notice__form #room_number');
  var currentRoomNumber = window.utils.html.getSelectedOptionFromSelect(roomsNumberSelect).value;
  var maxGuestsPermitted = capacityToMaxGuestsMap[currentRoomNumber];
  roomsNumberSelect.addEventListener('change', function() {
    currentRoomNumber = window.utils.html.getSelectedOptionFromSelect(roomsNumberSelect).value;
    maxGuestsPermitted = capacityToMaxGuestsMap[currentRoomNumber];

    correlateRoomsWithCapacity();
  });
  correlateRoomsWithCapacity();

  form.addEventListener('submit', function (evt) {
    guardOneFeatureSelected(evt);
  });



  function correlateRoomsWithCapacity() {
    var capacitySelect = document.querySelector('.notice__form #capacity');
    var options = window.utils.html.getSelectOptions(capacitySelect);

    for (var j = 0; j < options.length; j++) {
      options[j].disabled = false;
    }

    for (var i = 0; i < options.length; i++) {
      if (options[i].value > maxGuestsPermitted) {
        options[i].disabled = true;
      }
    }

    if (window.utils.html.getSelectedOptionFromSelect(capacitySelect).disabled) {
      var possibleOptions = [];
      for (let i = 0; i < options.length; i++) {
        if (!options[i].disabled) {
          possibleOptions.push(options[i]);
          var maxPossibleOption = possibleOptions[0];
          capacitySelect.value = maxPossibleOption.value;
        }
      }
    }
  }

  // Make sure at least one feature is selected
  function guardOneFeatureSelected(evt) {
    var featuresEls = document.querySelectorAll('.notice__form input[type="checkbox"');
    var allUnchecked = true;
    for (var i = 0; i < featuresEls.length; i++) {
      var featureEl = featuresEls[i];
      if (featureEl.checked) {
        allUnchecked = false;
        break;
      }
    }

    if (allUnchecked) {
      evt.preventDefault();
      clientErrors.allFeaturesNotSelected.value = true;
      renderNoticeErrorsList();
    }
  }

  function renderNoticeErrorsList() {
    if (errorsList === null) {
      errorsList = createErrorsList();
      document.querySelector('.form__element--submit').appendChild(errorsList);
    }

    var errors = [];
    for (var key in clientErrors) {
      if (clientErrors[key].value === true) {
        errors.push(clientErrors[key])
      }
    }

    errorsList.innerHTML = '';
    errors.forEach(function (err) {
      errorsList.insertAdjacentHTML('afterbegin',
        '<li class="form__errors-item errors-list__item">' + err.msg + '</li>')
    });
  }

  function createErrorsList() {
    var errorsListTemplate = document.querySelector('template').content.querySelector('.form__errors-list');
    var errorsList = errorsListTemplate.cloneNode(true);

    return errorsList;
  }

})();

