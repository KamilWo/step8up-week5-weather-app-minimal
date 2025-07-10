document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const apiKeyInput = document.getElementById("api-key-input");
  const locationInput = document.getElementById("location-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherResultDiv = document.getElementById("weather-result");
  const errorMessageDiv = document.getElementById("error-message");
  const loadingSpinner = document.getElementById("loading");
  const avatarMenuBtn = document.getElementById("avatar-menu-btn");
  const apiKeySubmenu = document.getElementById("api-key-submenu");

  // Fetch API Key from local storage on load
  apiKeyInput.value = localStorage.getItem("OpenWeatherApiKey") || "";
  let API_KEY = apiKeyInput.value.trim() || "YOUR_API_KEY_HERE";

  // Toggle API Key submenu visibility
  avatarMenuBtn.addEventListener("click", () => {
    apiKeySubmenu.classList.toggle("hidden");
  });

  // Hide submenu if clicked outside
  document.addEventListener("click", (event) => {
    if (!avatarMenuBtn.contains(event.target) && !apiKeySubmenu.contains(event.target)) {
      apiKeySubmenu.classList.add("hidden");
    }
  });

  showMessage = (element, message, isError = false) => {
    hideAllMessages();
    element.textContent = message;
    element.classList.remove("hidden");
    if (isError) {
      element.classList.add("error-message");
      element.classList.remove("weather-display");
    } else {
      element.classList.remove("error-message");
      // For loading spinner, ensures no extra styles
      element.classList.remove("weather-display");
    }
  }

  //Function to hid all display areas
  hideAllMessages = () => {
    weatherResultDiv.classList.add("hidden");
    errorMessageDiv.classList.add("hidden");
    loadingSpinner.classList.add("hidden");
  }

  getCoordinates = async (location) => {
    // Geocoding API endpoint
    const geoApiUrl =
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${API_KEY}`;

    try {
      const response = await fetch(geoApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.length > 0) {
        // Return the first found location's coordinates
        return {lat: data[0].lat, lon: data[0].lon, name: data[0].name, country: data[0].country};
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw new Error(`Could not retrieve coordinates: ${error.message}`);
    }
  }

  // Function to get current weather data using coordinates
  getCurrentWeather = async (lat, lon, units = "metric") => {
    // Current Weather Data API endpoint
    const weatherApiUrl =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;

    try {
      const response = await fetch(weatherApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error(`Could not retrieve weather data: ${error.message}`);
    }
  }

  displayWeather = (weatherData, locationName, countryCode) => {
    hideAllMessages();
    weatherResultDiv.classList.remove("hidden");

    const name = weatherData.name;
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;

    weatherResultDiv.innerHTML = `
              <h2 class="text-blue-700">${name}, ${countryCode}</h2>
              <p>Temperature: <span class="font-bold">${temp}°C</span></p>
              <p>Condition: <span class="capitalize">${description}</span></p>
          `;
  }

  // Event listener for the "Get Weather" button
  getWeatherBtn.addEventListener("click", async () => {
    const location = locationInput.value.trim();

    if (!location) {
      showMessage(errorMessageDiv, "Please enter a location.", true);
      return;
    }
    if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
      showMessage(errorMessageDiv, "Please enter a valid OpenWeatherMap API Key in the menu.", true);
      return;
    }

    // Show loading spinner
    showMessage(loadingSpinner, "", false); // Clear message, just show spinner

    try {
      // Step 1: Get coordinates
      const coords = await getCoordinates(location);

      // Step 2: Get current weather using the coordinates
      const weatherData = await getCurrentWeather(coords.lat, coords.lon);

      // Step 3: Display the weather data
      displayWeather(weatherData, coords.name, coords.country);

    } catch (error) {
      showMessage(errorMessageDiv,
        `Error: ${error.message}. Please ensure your API key is correct and the location exists.`, true);
    }
  });

  apiKeyInput.addEventListener("input", () => {
    localStorage.setItem("OpenWeatherApiKey", apiKeyInput.value.trim());
    API_KEY = apiKeyInput.value.trim();
  });

  // Optional: Allow pressing Enter in the input field to trigger search
  locationInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      getWeatherBtn.click();
    }
  });
});
