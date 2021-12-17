const apiKey =
  'pk.eyJ1IjoiamFld29uLWh3YW5nIiwiYSI6ImNreGFxd2NsdDBidmgybm1maHVlanpkZjcifQ.Au9O-R9rV-CBJdgprTD09w';
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const options =
  'bbox=-97.325875,49.766204,-96.953987,49.99275&autocomplete=true&fuzzyMatch=true&limit=10';
const startingLocationEl = document.querySelector(
  'input[placeholder = "Find a starting location"]'
);
const destinationEl = document.querySelector(
  'input[placeholder = "Choose your Destination"]'
);
const originList = document.getElementsByClassName('origins')[0];
const destnationList = document.getElementsByClassName('destinations')[0];
console.log(destnationList);
//const getLocation = (input) =>

function changeStringForApi(string) {
  return string.split(' ').join('%20');
}

function getLocations(e) {
  if (e.keyCode === 13) {
    if (startingLocationEl.value !== '') {
      const starting = startingLocationEl.value;
    } else if (destinationEl.value !== '') {
      const destinations = destinationEl.value;
    }

    e.preventDefault();
  }
}

addEventListener('keydown', getLocations);
