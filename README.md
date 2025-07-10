# Skill8Up Week 5 Weather Dashboard App

## Weather Dashboard

## 🎯 Overview

This project is a Weather Dashboard application that allows users to retrieve current weather information for a
specified location. The application leverages
the [openweathermap.org](https://www.google.com/search?q=https://openweathermap.openweathermap.org/) API to convert a
user-entered location into geographic coordinates (latitude and longitude) and then fetches the current weather details
for those coordinates.

The primary goal of this challenge is to demonstrate proficiency in working with third-party APIs, parsing JSON
responses, selecting specific data, and dynamically updating a user interface using JavaScript.

*NB: requirements folder contains detailed readme and rubrics.*

## ✨ Features

* **Location-Based Weather**: Get current weather data by entering a city name or postal code.
* **Geocoding Integration**: Converts location names to latitude and longitude using OpenWeatherMap's Geocoding API.
* **Current Weather Display**: Shows the location name, temperature, and a brief weather description.
* **Dynamic UI Updates**: The dashboard updates in real-time as new weather data is fetched.
* **Error Handling**: Gracefully handles invalid locations or failed API requests with informative messages.

## 📜 User Story

As a user, I want to enter a location into the Weather Dashboard, and I want the application to display the current
weather for that location, including the name, temperature, and a short description of the weather conditions.

## 📋 Acceptance Criteria

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

## 🧠 Key Learnings

This challenge provides an opportunity to learn and practice:

* Working and collaborating as a development team
* Planning and coordinating tasks and resources
* Collaborating using GitHub, branches, and Pull Requests
* How to work with a 3rd Party API that requires basic authentication.
* Parsing and selecting specific data from a JSON response.
* Updating the UI dynamically using JavaScript.

---

## 🌐 Website public URL

[Github Pages URL](https://kamilwo.github.io/step8up-week5-weather-app-minimal)

---

## 🔍 Validation

[W3 HTML Validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fkamilwo.github.io%2Fstep8up-week5-weather-app-minimal%2F)

[W3 CSS Validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fkamilwo.github.io%2Fstep8up-week5-weather-app-minimal&profile=css3svg&usermedium=all&warning=1)

### Automated Testing Tools

- **HTML Validation** ✓
  - Use [W3C Markup Validation Service](https://validator.w3.org/)
  - Ensure all pages pass without errors
  - Check for proper semantic structure

- **CSS Validation** 🎨
  - Use [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)
  - Verify CSS syntax and properties
  - Check for vendor prefix requirements

- **Accessibility Testing** ♿
  - Use [WAVE Web Accessibility Tool](https://wave.webaim.org/)
  - Check ARIA labels and roles
  - Verify color contrast ratios
  - Test keyboard navigation

- **Responsive Design Testing** 📱
  - Use Chrome DevTools Device Emulation
  - Test on multiple real devices
  - Verify breakpoints functionality

### Manual Testing Checklist

1. **Cross-browser Testing** 🌐

- Chrome
- Firefox
- Safari
- Edge

2. **Functionality Testing** ⚙️

- Navigation links
- Form submissions
- Interactive elements
- Search functionality

3. **Content Review** 📝

- Spelling and grammar
- Image alt texts
- Link text clarity
- Content consistency

4. **Performance Testing** ⚡

- Page load times
- Image optimization
- CSS/JS minification
- Mobile performance

5. **User Experience Testing** 👥

- Navigation flow
- Form usability
- Error message clarity
- Mobile touch targets

## 📚 Useful Online Resources

[Pull Requests and Git Collaboration](https://github.com/Step8Up-SBC/Jan-25/tree/main/week-2/W2-S3-FlexBox/10_Git-Collaboration)

[OpenWeatherMap API Documentation](https://openweathermap.org/api)

[MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

[MDN Web Docs - Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

## License

This project is open-sourced under the GPLv3 License.
