document.addEventListener('DOMContentLoaded', () => {
    const apiKey = "";
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    
    const searchBox = document.querySelector('.searchBox');
    const searchBtn = document.querySelector('.searchBtn');

    if (searchBtn) {
        searchBtn.addEventListener('click', async () => {
            try {
                const response = await fetch(apiURL + searchBox.value + `&appid=${apiKey}`);
                const data = await response.json();

                console.log(data);

                document.querySelector('.city').innerHTML = data.name;
                document.querySelector('.temp').innerHTML = data.main.temp + '°C';
                document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
                document.querySelector('.wind').innerHTML = data.wind.speed + 'k/mh';
                document.querySelector('.windDir').innerHTML = data.wind.deg + '°';
            }   catch (error) {
                console.error(error);
            }
        });
    }
});