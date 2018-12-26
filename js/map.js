var ads = createAds(8);

renderAllPins(ads);
renderFirstAdMapCard();

// по идее потом для клика будет свой кард
function renderFirstAdMapCard() {
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var firstAd = ads[0];
  var typeMap = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var mapCard = mapCardTemplate.cloneNode(true);
  mapCard.querySelector('.popup__avatar').src = firstAd.author.avatar;
  mapCard.querySelector('h3').textContent = firstAd.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = firstAd.offer.address;
  mapCard.querySelector('.popup__price-number').textContent = firstAd.offer.price;
  mapCard.querySelector('.popup__type').textContent = typeMap[firstAd.offer.type];
  mapCard.querySelector('.popup__rooms').textContent = firstAd.offer.rooms;
  mapCard.querySelector('.popup__guests').textContent = firstAd.offer.guests;
  mapCard.querySelector('.popup__checkin').textContent = firstAd.offer.checkin;
  mapCard.querySelector('.popup__checkout').textContent = firstAd.offer.checkout;
  firstAd.offer.features.forEach(function (feature) {
    mapCard.querySelector('.popup__features').insertAdjacentHTML(
      'afterbegin',
      '<li class="feature feature--' + feature + '"></li>');
  });
  mapCard.querySelector('.popup__description').textContent = firstAd.offer.description;
  firstAd.offer.photos.forEach(function (photo) {
    mapCard.querySelector('.popup__pictures').insertAdjacentHTML('afterbegin',
      '<li><img src="' + photo + '"></li>');
  });

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  mapFiltersContainer.insertAdjacentElement('beforebegin', mapCard);
}

function renderAllPins(ads) {
  var pinsFragment = document.createDocumentFragment();
  ads.forEach(function (ad) {
    pinsFragment.appendChild(renderPin(ad));
  });

  var pinsMap = document.querySelector('.map__pins');
  pinsMap.appendChild(pinsFragment);
}

function renderPin(ad) {
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var pinEl = pinTemplate.cloneNode(true);

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

    ad.author = {
      avatar: ' img/avatars/user0' + i + '.png'
    };
    var adCoords = {
      x: getRandomInt(200, 800),
      y: getRandomInt(130, 630)
    };
    ad.offer = {
      title: TITLES[i],
      address: adCoords.x + ', ' + adCoords.y,
      price: getRandomInt(1000, 1000000),
      type: TYPES[getRandomInt(0, 3)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(0, 4),
      checkin: CHECKINS[getRandomInt(0, 2)],
      checkout: CHECKOUTS[getRandomInt(0, 2)],
      features: getArrRandomPart(shuffleItems(FEATURES)),
      description: '',
      photos: shuffleItems(PHOTOS)
    };
    ad.location = {
      x: adCoords.x,
      y: adCoords.y
    };

    ads.push(ad);
  }

  return ads;
}


