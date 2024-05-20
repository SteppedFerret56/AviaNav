/*let airportDistanceInput;
let newAirportDistanceThreshold;
let selectedManufacturer;
let selectedModel;

const submitBtn = document.getElementById('submitBtn');

if (submitBtn) {
    submitBtn.addEventListener('click', function(){
        selectedManufacturer = document.getElementById('aircraft-manufacturer').value;
        selectedModel = document.getElementById('aircraft-model').value;
    });
}

// const aircraftApiKey = '';

// Fetch the aircraft API json
async function logAircraft(url = '', data = {}) {
    const aircraftApiUrl = 'https://api.api-ninjas.com/v1/aircraft?manufacturer=' + selectedManufacturer + '&model=' + selectedModel;
    const response = await fetch(aircraftApiUrl, {
        method: 'POST',
        headers: {'X-Api-Key': aircraftApiKey, 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    return response.json();
} */