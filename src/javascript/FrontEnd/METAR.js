document.addEventListener('DOMContentLoaded', () => {
    const apiKey = "API_KEY_HERE";

    const searchBtn = document.querySelector('.airportSearchBtn');

    function getApiUrl() {
        let airportCode = document.querySelector('.airportSearch').value;
        let apiUrl = `https://avwx.rest/api/metar/${airportCode}?format=json`;
        return apiUrl;
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

                        document.getElementById('airportNameText').textContent = station;
                        document.getElementById('metarDataTemp').textContent = temperature.value + ' ' + units.temperature + '°';
                        document.getElementById('metarDataClouds').textContent = 'N/A';
                        document.getElementById('metarDataWindSpd').textContent = wind_speed.value + ' ' + units.wind_speed;
                        document.getElementById('metarDataWindDir').textContent = wind_direction.value + '°';
                        document.getElementById('metarDataVis').textContent = visibility.value + ' ' + units.visibility;
                        document.getElementById('metarDataPressure').textContent = altimeter.value + units.altimeter;
                        document.getElementById('metarDataTime').textContent = time;
                    }
                };

                request.send();
            } catch (error) {
                console.error(error);
            }
        });
    }
});

function openNavmenu() {
    document.querySelector(".sideNavContainer").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNavMenu() {
    document.querySelector(".sideNavContainer").style.width = "0";
    document.body.style.backgroundColor = "white";
}