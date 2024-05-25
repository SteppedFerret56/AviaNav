document.addEventListener('DOMContentLoaded', async () => {
    const airportDistanceInput = document.getElementById('airportDistance');
    const submitBtn = document.getElementById('submitBtn');

    const manufacturerDropdown = document.getElementById('aircraft-manufacturer');
    const modelDropdown = document.getElementById('aircraft-model');
    const boeingModels = ['737', '747', '767', '777', '787'];
    const airbusModels = ['A320', 'A330', 'A340', 'A350', 'A380'];
    const gulfstreamModels = ['G550', 'G600', 'G650', 'G700'];
    const defaultModels = ['Please Select a Manufacturer First'];

    let selectedManufacturer;

    manufacturerDropdown.addEventListener('change', function () {
        modelDropdown.innerHTML = '';

        selectedManufacturer = manufacturerDropdown.value;

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
            const option = document.createElement('option');
            option.value = models[i];
            option.text = models[i];
            modelDropdown.add(option);
        }
    });

    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            let airportArray = await getAirports();

            const newAirportDistanceThreshold = parseFloat(airportDistanceInput.value);

            let airport1, airport2, distance;

            do {
                airport1 = getRandomAirport(airportArray);
                airport2 = getRandomAirport(airportArray);
                distance = calculateDistance(airport1.lat, airport1.lon, airport2.lat, airport2.lon);
            } while (!isWithinRange(distance, newAirportDistanceThreshold, 100));


            document.getElementById('airportDistanceText').textContent = `The distance between these airports is: ${distance} NM`;
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

            const aircraftData = await logAircraft();
        });

    }
});