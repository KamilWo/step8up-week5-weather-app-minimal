document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const apiKeyInput = document.getElementById("api-key-input");
  const apiKeySubmenu = document.getElementById("api-key-submenu");
  const userMenuBtn = document.getElementById("user-menu-btn");
  const carouselIndicators = document.getElementById("carousel-indicators");
  const currentCityElement = document.getElementById("current-weather-city");
  const currentWeatherCondition = document.getElementById("current-weather-condition");
  const currentWeatherFeels = document.getElementById("current-weather-feels");
  const currentWeatherIcon = document.getElementById("current-weather-icon");
  const currentWeatherTemp = document.getElementById("current-weather-temp");
  const currentWeatherWind = document.getElementById("current-weather-wind");
  const errorMessageDiv = document.getElementById("error-message");
  const forecastCarouselInner = document.getElementById("forecast-carousel-inner");
  const forecastSection = document.getElementById("forecast-section");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const loadingSpinner = document.getElementById("loading");
  const locationInput = document.getElementById("location-input");
  const weatherResultDiv = document.getElementById("weather-result");

  // Fetch API Key from local storage on load
  apiKeyInput.value = localStorage.getItem("OpenWeatherApiKey") || "";
  let API_KEY = apiKeyInput.value.trim() || "YOUR_API_KEY_HERE";

  // Toggle User submenu visibility to set API Key
  userMenuBtn.addEventListener("click", () => {
    apiKeySubmenu.classList.toggle("hidden");
  });

  // Hide submenu if clicked outside
  document.addEventListener("click", (event) => {
    if (!userMenuBtn.contains(event.target) && !apiKeySubmenu.contains(event.target)) {
      apiKeySubmenu.classList.add("hidden");
    }
  });

  // Function to display messages (error or loading)
  const showMessage = (element, message, isError = false) => {
    hideAllDisplays(); // Hide all weather/forecast sections first
    element.textContent = message;
    element.classList.remove("hidden");
    if (isError) {
      element.classList.add("error-message");
      element.classList.remove("weather-display"); // Ensure no conflicting styles
    } else {
      element.classList.remove("error-message");
    }
  };

  // Function to hide all weather and forecast display areas
  const hideAllDisplays = () => {
    weatherResultDiv.classList.add("hidden");
    errorMessageDiv.classList.add("hidden");
    loadingSpinner.classList.add("hidden");
    forecastSection.classList.add("hidden");
  };

  // Function to get coordinates for a given location
  const getCoordinates = async (location) => {
    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${API_KEY}`;
    try {
      const response = await fetch(geoApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.length > 0) {
        return { lat: data[0].lat, lon: data[0].lon, name: data[0].name, country: data[0].country };
      } else {
        throw new Error("City not found.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw new Error(`Could not retrieve coordinates: ${error.message}`);
    }
  };

  // Function to get current weather data
  const getCurrentWeather = async (lat, lon, units = "metric") => {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
    try {
      const response = await fetch(weatherApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching current weather data:", error);
      throw new Error(`Could not retrieve current weather data: ${error.message}`);
    }
  };

  // Function to get 5-day / 3-hour forecast data
  const getFiveDayForecast = async (lat, lon, units = "metric") => {
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
    try {
      const response = await fetch(forecastApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      throw new Error(`Could not retrieve forecast data: ${error.message}`);
    }
  };

  // Function to display current weather
  const displayCurrentWeather = (weatherData, locationName, countryCode) => {
    weatherResultDiv.classList.remove("hidden");
    currentCityElement.textContent = `${locationName}, ${countryCode}`;
    currentWeatherTemp.textContent = `${Math.round(weatherData.main.temp)}°C`;
    currentWeatherCondition.textContent = weatherData.weather[0].description;
    currentWeatherFeels.textContent = `Feels like: ${Math.round(weatherData.main.feels_like)}°C`;
    currentWeatherWind.textContent = `Wind: ${Math.round(weatherData.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
    currentWeatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    currentWeatherIcon.alt = weatherData.weather[0].description;
  };

  // Function to display forecast in a carousel
  const displayForecast = (forecastData, cityName) => {
    forecastSection.classList.remove("hidden");
    forecastCarouselInner.innerHTML = ''; // Clear previous items
    carouselIndicators.innerHTML = ''; // Clear previous indicators

    // Group forecast data by date
    const weatherByDate = {};
    forecastData.list.forEach(record => {
      const date = new Date(record.dt * 1000);
      const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

      if (!weatherByDate[formattedDate]) {
        weatherByDate[formattedDate] = [];
      }
      weatherByDate[formattedDate].push(record);
    });

    let itemIndex = 0;
    for (const date in weatherByDate) {
      // Create carousel item
      const carouselItemDiv = document.createElement("div");
      carouselItemDiv.classList.add("hidden", "duration-700", "ease-in-out");
      carouselItemDiv.setAttribute("data-carousel-item", "");
      if (itemIndex === 0) {
        carouselItemDiv.classList.remove("hidden");
      }

      const hourlyContainer = document.createElement("div");
      hourlyContainer.classList.add("forecast-hourly-container", "flex", "flex-nowrap", "overflow-x-auto", "justify-center", "gap-4", "p-2");

      // Sort hourly data by time
      weatherByDate[date].sort((a, b) => a.dt - b.dt);

      weatherByDate[date].forEach(hourlyRecord => {
        const time = new Date(hourlyRecord.dt * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
        const iconUrl = `https://openweathermap.org/img/wn/${hourlyRecord.weather[0].icon}@2x.png`;

        const hourCard = `
          <div class="forecast-hour-card">
            <h3>${time}</h3>
            <img src="${iconUrl}" alt="${hourlyRecord.weather[0].description}" class="weather-icon">
            <p class="capitalize">${hourlyRecord.weather[0].description}</p>
            <p>Temp: ${Math.round(hourlyRecord.main.temp)}°C</p>
            <p>Wind: ${Math.round(hourlyRecord.wind.speed * 3.6)} km/h</p>
          </div>
        `;
        hourlyContainer.insertAdjacentHTML('beforeend', hourCard);
      });

      carouselItemDiv.innerHTML = `
        <div class="text-center mb-4">
          <h2 class="text-2xl font-bold text-gray-800">${cityName}</h2>
          <h3 class="text-xl font-semibold text-blue-600">${date}</h3>
        </div>
      `;
      carouselItemDiv.appendChild(hourlyContainer);
      forecastCarouselInner.appendChild(carouselItemDiv);

      // Create carousel indicator
      const indicatorButton = document.createElement("button");
      indicatorButton.type = "button";
      indicatorButton.classList.add("w-3", "h-3", "rounded-full");
      if (itemIndex === 0) {
        indicatorButton.setAttribute("aria-current", "true");
      }
      indicatorButton.setAttribute("aria-label", `Slide ${itemIndex + 1}`);
      indicatorButton.setAttribute("data-carousel-slide-to", itemIndex.toString()); // Important for Flowbite

      carouselIndicators.appendChild(indicatorButton);
      itemIndex++;
    }

    if (typeof initFlowbite === 'function') {
      initFlowbite(); // Re-initialize all Flowbite components
    } else {
      console.warn("initFlowbite() not found. Carousel indicators might not function correctly if Flowbite is not re-initialized.");
    }

  };

  // Event listener for the "Get Weather" button
  getWeatherBtn.addEventListener("click", async () => {
    const location = locationInput.value.trim();

    if (!location) {
      showMessage(errorMessageDiv, "Please enter chosen location.", true);
      return;
    }
    if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
      showMessage(errorMessageDiv, "Please enter a valid OpenWeatherMap API Key in the top user menu.", true);
      return;
    }

    // Show loading spinner
    showMessage(loadingSpinner, "", false);

    try {
      // Step 1: Get coordinates
      const coords = await getCoordinates(location);

      // Step 2: Get current weather
      const currentWeatherData = await getCurrentWeather(coords.lat, coords.lon);

      // Step 3: Get 5-day forecast
      const forecastData = await getFiveDayForecast(coords.lat, coords.lon);

      // Hide loading spinner and error messages
      hideAllDisplays();

      // Step 4: Display current weather data
      displayCurrentWeather(currentWeatherData, coords.name, coords.country);

      // Step 5: Display forecast data in carousel
      displayForecast(forecastData, coords.name);

    } catch (error) {
      showMessage(errorMessageDiv,
        `Error: ${error.message}. Please ensure your API key is correct and the location exists.`, true);
    }
  });

  apiKeyInput.addEventListener("input", () => {
    localStorage.setItem("OpenWeatherApiKey", apiKeyInput.value.trim());
    API_KEY = apiKeyInput.value.trim(); // Update API_KEY directly
  });

  // Optional: Allow pressing Enter in the input field to trigger search
  locationInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      getWeatherBtn.click();
    }
  });
});
