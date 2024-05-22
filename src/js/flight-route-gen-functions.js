let airportDistanceInput;
let newAirportDistanceThreshold;
let selectedManufacturer;
let selectedModel;

document.addEventListener('click', function(){
    selectedManufacturer = document.getElementById('aircraft-manufacturer').value;
    selectedModel = document.getElementById('aircraft-model').value;
});


// Get the airport data from the JSON file
async function getAirports() {
    const response = await fetch("/src/data/Airports-master/airports.json");
    const json = await response.json();
    return Object.values(json);
}

// Get a random airport from the airport array
function getRandomAirport(airportArray) {
    return airportArray[Math.floor(Math.random() * airportArray.length)];
}

// Calculate the distance between two airports
function calculateDistance(lat1, lon1, lat2, lon2) {
    const radiusEarth = 6371; // Radius of the earth in km
    const degreesLatitude = deg2rad(lat2 - lat1);
    const degreesLongitude = deg2rad(lon2 - lon1);
    const squareChordLength = Math.sin(degreesLatitude / 2) * Math.sin(degreesLatitude / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(degreesLongitude / 2) * Math.sin(degreesLongitude / 2);
    const angularDistance = 2 * Math.atan2(Math.sqrt(squareChordLength), Math.sqrt(1 - squareChordLength));
    let distance = radiusEarth * angularDistance; // Distance in km
    return Math.round(distance);
}

// Convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// Check if the number is within a certain range
function isWithinRange(number, original, range) {
    return number >= original - range && number <= original + range;
}

// Fetch the aircraft API json
async function logAircraft(url = '', data = {}) {
    const aircraftApiKey = '';
    const aircraftApiUrl = 'https://api.api-ninjas.com/v1/aircraft?manufacturer=' + selectedManufacturer + '&model=' + selectedModel;
    const response = await fetch(aircraftApiUrl, {
        method: 'POST',
        headers: {'X-Api-Key': aircraftApiKey, 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    return response.json();
}