;(function () {

  var ads = createAds(8);
  var map = document.querySelector('.map');

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinContainer = document.querySelector('.map__pins');
  document.addEventListener('mouseup', onMainPinUp);
  document.addEventListener('mousedown', onMainPinDown);

  window.map = {
    ads: ads,

    enableMap: enableMap,
    renderAllPins: renderAllPins,
    showAdCardOnPinClick: showAdCardOnPinClick,
    setCoordsForAddressInputByPin: setCoordsForAddressInputByPin
  };



  var dragStartCoords = {};
  // mainPin has pos: relative, so if it goes below 0, then it is out of the container
  var maxLeft = 0;
  var maxRight = mainPinContainer.offsetWidth - mainPin.offsetWidth;
  // mainPin has pos: relative, so if it goes above 0, then it is out of the container
  var maxTop = 0;
  var maxBottom = mainPinContainer.offsetHeight - mainPin.offsetHeight;
  function onMainPinDown(evt) {
    dragStartCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMainPinMove);
  }
  function onMainPinMove(evt) {
    var shift = {
      x: dragStartCoords.x - evt.clientX,
      y: dragStartCoords.y - evt.clientY
    };

    dragStartCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var resultYPos = mainPin.offsetTop - shift.y;
    var resultXPos = mainPin.offsetLeft - shift.x;
    if (resultYPos < maxTop) {
      resultYPos = maxTop;
    }
    if (resultYPos > maxBottom) {
      resultYPos = maxBottom;
    }
    if (resultXPos < maxLeft) {
      resultXPos = 0;
    }
    if (resultXPos > maxRight) {
      resultXPos = maxRight;
    }

    mainPin.style.top = resultYPos + 'px';
    mainPin.style.left = resultXPos + 'px';
  }
  function onMainPinUp(evt) {
    window.startup.activateApp();
    window.map.setCoordsForAddressInputByPin(evt);

    document.removeEventListener('mousemove', onMainPinMove);
  }
  
  function setCoordsForAddressInputByPin(evt) {
    var pinCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var adAddressInput = document.querySelector('input#address');
    adAddressInput.value = pinCoords.x + ', ' + pinCoords.y;
  }

  function enableMap() {
    map.classList.remove('map--faded');
  }
  function disableMap() {
    map.classList.add('map--faded');
  }

  function showAdCardOnPinClick() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pinClickHandler(pin);
    });
  }

  function pinClickHandler(pin) {
    pin.addEventListener('click', function () {
      var adId = pin.dataset.adId;
      var ad = ads[adId];
      renderAdCard(ad);
    })
  }

  var pinCard = null;
  function renderAdCard(ad) {
    if (pinCard === null) {
      var pinCardTemplate = document.querySelector('template').content.querySelector('.map__card');
      pinCard = pinCardTemplate.cloneNode(true);
    }
    var typeMap = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };

    pinCard.querySelector('.popup__avatar').src = ad.author.avatar;
    pinCard.querySelector('h3').textContent = ad.offer.title;
    pinCard.querySelector('.popup__text--address').textContent = ad.offer.address;
    pinCard.querySelector('.popup__price-number').textContent = ad.offer.price;
    pinCard.querySelector('.popup__type').textContent = typeMap[ad.offer.type];
    pinCard.querySelector('.popup__rooms').textContent = ad.offer.rooms;
    pinCard.querySelector('.popup__guests').textContent = ad.offer.guests;
    pinCard.querySelector('.popup__checkin').textContent = ad.offer.checkin;
    pinCard.querySelector('.popup__checkout').textContent = ad.offer.checkout;
    pinCard.querySelector('.popup__features').innerHTML = '';
    ad.offer.features.forEach(function (feature) {
      pinCard.querySelector('.popup__features').insertAdjacentHTML(
        'afterbegin',
        '<li class="feature feature--' + feature + '"></li>');
    });
    pinCard.querySelector('.popup__description').textContent = ad.offer.description;
    pinCard.querySelector('.popup__pictures').innerHTML = '';
    ad.offer.photos.forEach(function (photo) {
      pinCard.querySelector('.popup__pictures').insertAdjacentHTML('afterbegin',
        '<li><img src="' + photo + '"></li>');
    });

    var mapFiltersContainer = document.querySelector('.map__filters-container');
    mapFiltersContainer.insertAdjacentElement('beforebegin', pinCard);

    var pinCardCloseBtn = pinCard.querySelector('.popup__close');
    pinCardCloseBtn.addEventListener('click', function () {
      pinCard.remove();
      pinCard = null;
    });
  }

  function renderAllPins() {
    var pinsFragment = document.createDocumentFragment();
    window.map.ads.forEach(function (ad) {
      var pinEl = renderPin(ad);
      pinsFragment.appendChild(pinEl);
    });

    var pinsMap = document.querySelector('.map__pins');
    pinsMap.appendChild(pinsFragment);
  }

  function renderPin(ad) {
    var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

    var pinEl = pinTemplate.cloneNode(true);

    pinEl.dataset.adId = ad.id;
    pinEl.style.left = ad.location.x + 'px';
    pinEl.style.top = ad.location.y + 'px';
    pinEl.querySelector('img').src = ad.author.avatar;
    pinEl.querySelector('img').alt = ad.offer.title;

    return pinEl;
  }

  function createAds (count) {
    var TITLES = [
      "Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"
    ];
    var TYPES = [
      'palace', 'flat', 'house', 'bungalo'
    ];
    var CHECKINS = [
      '12:00', '13:00', '14:00'
    ];
    var CHECKOUTS = [
      '12:00', '13:00', '14:00'
    ];
    var FEATURES = [
      "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
    ];
    var PHOTOS = [
      "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
      "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
      "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    ];

    var ads = [];

    for (var i = 1; i <= count; i++) {
      var ad = {};

      ad.id = i - 1;
      ad.author = {
        avatar: ' img/avatars/user0' + i + '.png'
      };
      var adCoords = {
        x: window.utils.math.getRandomInt(100, 1100), // 0px - 1200px -> width of .map__pins block
        y: window.utils.math.getRandomInt(130, 630)
      };
      ad.offer = {
        title: TITLES[i - 1],
        address: adCoords.x + ', ' + adCoords.y,
        price: window.utils.math.getRandomInt(1000, 1000000),
        type: TYPES[window.utils.math.getRandomInt(0, 3)],
        rooms: window.utils.math.getRandomInt(1, 5),
        guests: window.utils.math.getRandomInt(0, 4),
        checkin: CHECKINS[window.utils.math.getRandomInt(0, 2)],
        checkout: CHECKOUTS[window.utils.math.getRandomInt(0, 2)],
        features: window.utils.arr.getArrRandomPart(window.utils.arr.shuffleItems(FEATURES)),
        description: '',
        photos: window.utils.arr.shuffleItems(PHOTOS)
      };
      ad.location = {
        x: adCoords.x,
        y: adCoords.y
      };

      ads.push(ad);
    }

    return ads;
  }

})();


