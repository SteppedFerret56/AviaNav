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
    const radiusEarth = 3440; // Radius of the earth in nm
    const degreesLatitude = degreesToRadians(lat2 - lat1);
    const degreesLongitude = degreesToRadians(lon2 - lon1);
    const squareChordLength = Math.sin(degreesLatitude / 2) * Math.sin(degreesLatitude / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
        Math.sin(degreesLongitude / 2) * Math.sin(degreesLongitude / 2);
    const angularDistance = 2 * Math.atan2(Math.sqrt(squareChordLength), Math.sqrt(1 - squareChordLength));
    let distance = radiusEarth * angularDistance; // Distance in km
    return Math.round(distance);
}

// Convert degrees to radians
function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}

// Check if the number is within a certain range
function isWithinRange(number, original, range) {
    return number >= original - range && number <= original + range;
}

// Fetch the aircraft API json
async function logAircraft(url = '', data = {}) {
    const manufacturerDropdown = document.getElementById('aircraft-manufacturer');
    const modelDropdown = document.getElementById('aircraft-model');

    let selectedManufacturer = manufacturerDropdown.value;
    let selectedModel = modelDropdown.value;

    const aircraftApiKey = '';
    const aircraftApiUrl = 'https://api.api-ninjas.com/v1/aircraft?manufacturer=' + selectedManufacturer + '&model=' + selectedModel;
    const response = await fetch(aircraftApiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': aircraftApiKey,
            'Content-Type': 'application/json'
        },
    });
    const responseBody = await response.text(); // Read the response body as text
    console.log(responseBody); // Log the response body
    return JSON.parse(responseBody); // Parse the response body as JSON
}