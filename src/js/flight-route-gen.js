document.addEventListener('DOMContentLoaded', async () => {
    const submitBtn = document.getElementById('submitBtn');

    const airportDistanceInput = document.getElementById('airportDistance');

    const manufacturerDropdown = document.getElementById('aircraft-manufacturer');
    const modelDropdown = document.getElementById('aircraft-model');
    //const selectedModel = modelDropdown.value;
    const aircraftApiKey = '';
    const boeingModels = ['737', '747', '767', '777', '787'];
    const airbusModels = ['A320', 'A330', 'A340', 'A350', 'A380'];
    const gulfstreamModels = ['G550', 'G600', 'G650', 'G700'];
    const defaultModels = ['Please Select a Manufacturer First'];
    const option = document.createElement('option');

    let selectedManufacturer;


    manufacturerDropdown.addEventListener('change', function() {
        // Clear the model dropdown
        modelDropdown.innerHTML = '';

        // Get the selected manufacturer
        selectedManufacturer = manufacturerDropdown.value;

        // Update the model dropdown based on the selected manufacturer
        let models;
        switch (selectedManufacturer) {
            case 'Boeing':
                models = boeingModels;
                break;
            case 'Airbus':
                models = airbusModels;
                break;
            case 'Gulfstream':
                models = gulfstreamModels;
                break;
            default:
                models = defaultModels;
        }

        for (let i = 0; i < models.length; i++) {
            option.value = models[i];
            option.text = models[i];
            modelDropdown.add(option);
        }
    });

    // Get the selected model, manufacturer, and create the API URL
    /*modelDropdown.addEventListener('change', async function() {
        const aircraftData = await logAircraft();

        console.log(aircraftData);

        document.getElementById('flightTime').textContent = `The flight time for this aircraft is: ${aircraftData[0].flight_time} hours`;
    }); */

    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            async function logAircraft(url = '', data = {}) {
                const aircraftApiUrl = 'https://api.api-ninjas.com/v1/aircraft?manufacturer=' + selectedManufacturer + '&model=' + selectedModel;
                const response = await fetch(aircraftApiUrl, {
                    method: 'POST',
                    headers: {'X-Api-Key': aircraftApiKey, 'Content-Type': 'application/json'},
                    body: JSON.stringify(data),
                });
                return response.json();
            }

            let airportArray = [];

            async function getAirports() {
                const response = await fetch("/src/data/Airports-master/airports.json");
                const json = await response.json();
                airportArray = Object.values(json);
            }


            function getRandomAirport() {
                return airportArray[Math.floor(Math.random() * airportArray.length)];
            }

            await getAirports();

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

            function deg2rad(deg) {
                return deg * (Math.PI / 180);
            }

            function isWithinRange(number, original, range) {
                return number >= original - range && number <= original + range;
            }

            const newAirportDistanceThreshold = parseFloat(airportDistanceInput.value);

            let airport1, airport2, distance;

            do {
                airport1 = getRandomAirport();
                airport2 = getRandomAirport();
                distance = calculateDistance(airport1.lat, airport1.lon, airport2.lat, airport2.lon);
            } while (!isWithinRange(distance, newAirportDistanceThreshold, 100));


            document.getElementById('airportDistanceText').textContent = `The distance between these airports is: ${distance} km`;
            document.getElementById('airport1').innerHTML = `
                <h2>Departure</h2>
                <p>Name: ${airport1.name}</p>
                <p>ICAO: ${airport1.icao}</p>
            `;

            document.getElementById('airport2').innerHTML = `
                <h2>Arrival</h2>
                <p>Name: ${airport2.name}</p>
                <p>ICAO: ${airport2.icao}</p>
            `;
        });
    }
});
