const { createApp } = Vue
const app = {
    data() {
        return {
            cities: [],
            apiKey: '5f472b7acba333cd8a035ea85a0d4d4c',
            searchCity: '',
            errorMessage: '',
        }
    },

    methods: {
        async findWeather() {

            if (this.stopAdding) {
                this.searchCity = '';
                return;
            }

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.searchCity}&appid=${this.apiKey}&units=metric`;

            try {
                const { data } = await axios.get(apiUrl)
                const city = {
                    name: this.searchCity,
                    country: data.sys.country,
                    wind: data.wind.speed,
                    humidity: data.main.humidity,
                    temp: data.main.temp,
                    feelsLike: data.main.feels_like,
                    tempMin: data.main.temp_min,
                    tempMax: data.main.temp_max,
                    weather: {
                        main: data.weather[0].main,
                        desc: data.weather[0].description,
                    },
                }

                this.cities.push(city);
            } catch (e) {
                this.errorMessage = 'Sorry, we can not get weather for: ' + this.searchCity
            }

            this.searchCity = '';
        },

        getWeatherIcon(weather) {
            let str = '';
            switch(weather.main) {
                case 'Clouds':
                    str = 'fa fa-cloud fa-3x'
                    break;
                case 'Clear':
                    str = 'fa fa-sun-o fa-3x'
                    break;
                default:
                    str = 'fa fa-usd fa-3x'
            }

            return str;
        },
    },

    computed: {
        stopAdding() {
            return this.cities.length >= 3
        },
    },
}

createApp(app).mount('#app')
