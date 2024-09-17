import axios from 'axios';

const API_KEY = '1635890035cbba097fd5c26c8ea672a1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (response.status === 200) {
      const forecastData = response.data.list.filter((item, index) => index % 8 === 0); // First forecast per day
      return forecastData;
    }
  } catch (error) {
    console.error('Error fetching weather data', error);
    throw error;
  }
};
