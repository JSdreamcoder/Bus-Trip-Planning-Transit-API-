const apiKey =
  'pk.eyJ1IjoiamFld29uLWh3YW5nIiwiYSI6ImNreGFheGg2djNtbnkycG82OTRycW4wam0ifQ.3k423OSsVZVvpMVX8b6mLQ';
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const options =
  'bbox=-97.325875,49.766204,-96.953987,49.99275&autocomplete=true&fuzzyMatch=true&limit=10';
const startingLocationEl = document.querySelector(
  'input[placeholder = "Find a starting location"]'
);
const destinationEl = document.querySelector(
  'input[placeholder = "Choose your Destination"]'
);
const originListEl = document.getElementsByClassName('origins')[0];
const destinationListEl = document.getElementsByClassName('destinations')[0];
//originListEl.innerHTML = '';
//destinationListEl.innerHTML = '';
// API require '%20' as a space
const changeStringForApi = (string) => {
  return string.split(' ').join('%20');
};
// get input data and link to render function
const getLocations = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (startingLocationEl.value !== '') {
      let starting = changeStringForApi(startingLocationEl.value);
      startingLocationEl.value = '';

      return renderLocations(starting, 1);
    } else if (destinationEl.value !== '') {
      let destinations = changeStringForApi(destinationEl.value);
      destinationEl.value = '';

      return renderLocations(destinations, 2);
    }
  }
};

const renderLocations = (starting, index) => {
  fetch(`${url}${starting}.json?${options}&access_token=${apiKey}`)
    .then((response) => response.json())
    .then((data) => data.features)
    .then((features) => {
      console.log(features);
      if (index === 1) {
        originListEl.innerHTML = '';
      } else {
        destinationListEl.innerHTML = '';
      }
      features.forEach((el) => {
        let address =
          el.properties.address === undefined
            ? 'Winnipeg'
            : el.properties.address;
        const listsEl = `<li data-long="${el.center[0]}" data-lat="${el.center[1]}">
        <div class="name">${el.text}</div>
        <div>${address}</div>
        </li>`;
        if (index === 1) {
          originListEl.insertAdjacentHTML('beforeend', listsEl);
        } else if (index === 2) {
          destinationListEl.insertAdjacentHTML('beforeend', listsEl);
        }
      });
    });
};

const selectOrigine = (e) => {
  let countList = originListEl.childElementCount;
  for (let i = 0; i < countList; i++) {
    originListEl.children[i].classList.remove('selected');
  }
  e.target.closest('li').classList.add('selected');
};

const selectDestination = (e) => {
  let countList = destinationListEl.childElementCount;
  for (let i = 0; i < countList; i++) {
    destinationListEl.children[i].classList.remove('selected');
  }
  e.target.closest('li').classList.add('selected');
};

addEventListener('keydown', getLocations);
originListEl.addEventListener('click', selectOrigine);
destinationListEl.addEventListener('click', selectDestination);
