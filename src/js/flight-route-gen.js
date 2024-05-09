document.addEventListener('DOMContentLoaded', async () => {
    /* const aircraftManufacturer = document.getElementById('aircraft-manufacturer').value;
    const aircraftModel = document.getElementById('aircraft-model').value;
    const airportName = document.getElementById('airport-name').value; */
    const submitBtn = document.getElementById('submitBtn');
    const airportDistanceInput = document.getElementById('airportDistance');

    const aircraftApiKey = '';
    const aircraftApiUrl = 'https://api.api-ninjas.com/v1/aircraft?manufacturer=' + 'Gulfstream' + '&model=' + 'G550';

    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            async function logAircraft(url = '', data = {}) {
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


        document.getElementById('airportsList').textContent = `Airport 1: ${airport1.name} (${airport1.iata})\nAirport 2: ${airport2.name} (${airport2.iata})`;
        document.getElementById('airportDistanceText').textContent = `The distance between these airports is: ${distance} km`;
        });
    }
});