document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '';

    const searchBtn = document.querySelector('.airportSearchBtn');

    const airportNameText = document.getElementById('airportNameText');
    const metarDataTemp = document.getElementById('metarDataTemp');
    const metarDataClouds = document.getElementById('metarDataClouds');
    const metarDataWindSpd = document.getElementById('metarDataWindSpd');
    const metarDataWindDir = document.getElementById('metarDataWindDir');
    const metarDataVis = document.getElementById('metarDataVis');
    const metarDataPressure = document.getElementById('metarDataPressure');
    const metarDataTime = document.getElementById('metarDataTime');

    function getApiUrl() {
        let airportCode = document.querySelector('.airportSearch').value;
        return `https://avwx.rest/api/metar/${airportCode}?format=json`;
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', async () => {
            try {
                const request = new XMLHttpRequest();

                request.open('GET', getApiUrl());
                request.setRequestHeader('Authorization', apiKey);

                request.responseType = 'json';

                request.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        console.log('Status:', this.status);
                        console.log('Headers:', this.getAllResponseHeaders());
                        console.log('Body:', this.response);

                        const { station, temperature, units, wind_speed, wind_direction, visibility, altimeter } = this.response;

                        let datetime = this.response.time.dt;
                        let time = datetime.substring(11, 16) + 'Z';

                        airportNameText.textContent = station;
                        metarDataTemp.textContent = temperature.value + ' ' + units.temperature + '°';
                        metarDataClouds.textContent = 'N/A';
                        metarDataWindSpd.textContent = wind_speed.value + ' ' + units.wind_speed;
                        metarDataWindDir.textContent = wind_direction.value + '°';
                        metarDataVis.textContent = visibility.value + ' ' + units.visibility;
                        metarDataPressure.textContent = altimeter.value + units.altimeter;
                        metarDataTime.textContent = time;
                    }
                };

                request.send();
            } catch (error) {
                console.error(error);
            }
        });
    }
});