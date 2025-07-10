# Finish the Weather Dashboard

## Challenge

In this challenge, you will work as a team to produce a Weather Dashboard that utilizes
the [openweathermap.org](https://openweathermap.org/) API. The goal is simple: when the user enters a location, the
application converts it to a latitude and longitude, then makes a second API call to retrieve the current weather for
that location.

Your task is to:

1. Select only the data needed from the API response (location name, temperature, weather description).
2. Update the Dashboard to display this information correctly on the user interface.

Good luck, and happy coding!

## Key Learnings

- Working and collaborating as a development team
- Planning and co-ordinating tasks and resources
- Collaborating using GitHub, branches and Pull requests
- How to work with a 3rd Party API that requires basic authentication.
- Parsing and selecting specific data from a JSON response.
- Updating the UI dynamically using JavaScript.

## User Story

As a user, I want to enter a location into the Weather Dashboard, and I want the application to display the current
weather for that location, including the name, temperature, and a short description of the weather conditions.

## Acceptance Criteria

- [ ] The user can enter a location (city name or postal code) into the input field, and the app will fetch the weather
  data for that location.
- [ ] The app converts the entered location into latitude and longitude using the OpenWeatherMap Geocoding API.
    - Endpoint: `https://api.openweathermap.org/geo/1.0/direct?q=<location>&appid=<API_KEY>`
- [ ] After getting the latitude and longitude, the app uses this data to fetch the current weather details using the
  OpenWeatherMap Weather API.
    - Endpoint: `https://api.openweathermap.org/data/2.5/weather?lat=<lat>&lon=<lon>&appid=<API_KEY>`
- [ ] Only the following data is displayed on the dashboard:
    - **Location name** (e.g., city name)
    - **Temperature** in Celsius or Fahrenheit
    - **Weather description** (e.g., "clear sky", "light rain")
- [ ] The UI is updated dynamically when the data is fetched successfully, displaying the current weather on the
  dashboard.
- [ ] The app handles errors gracefully, including invalid locations or failed API requests, and displays appropriate
  error messages.

## Steps to Complete the Exercise

1. **Setup Your OpenWeatherMap API Key**:

    - Sign up for a free API key at [openweathermap.org](https://openweathermap.org/).
    - Use this key in your API calls for both geocoding and weather data retrieval.

2. **Fetch Location Coordinates**:

    - Use the OpenWeatherMap Geocoding API to convert the user-entered location into latitude and longitude.
    - Example API call:  
      `https://api.openweathermap.org/geo/1.0/direct?q=London&appid=YOUR_API_KEY`

3. **Fetch Weather Data**:

    - After getting the coordinates, use the latitude and longitude to fetch weather data from the OpenWeatherMap
      Weather API.
    - Example API call:  
      `https://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=-0.1278&appid=YOUR_API_KEY`

4. **Parse the JSON Response**:

    - Extract the following information from the JSON response:
        - `name`: The location name.
        - `main.temp`: The temperature (you may need to convert it to Celsius/Fahrenheit depending on your preference).
        - `weather[0].description`: A short description of the weather conditions.

5. **Update the Dashboard**:

    - Use DOM manipulation techniques to update the Weather Dashboard UI with the selected data.
    - Ensure that the weather information (location, temperature, and description) is displayed clearly and formatted
      properly.

6. **Handle Errors Gracefully**:
    - Add error handling in case the user enters an invalid location or the API request fails.
    - Display appropriate error messages to inform the user of any issues.

## Additional Resources

- [Pull Requests and Git Collaboration](https://github.com/Step8Up-SBC/Jan-25/tree/main/week-2/W2-S3-FlexBox/10_Git-Collaboration)
- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Web Docs - Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
