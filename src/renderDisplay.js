import { processWeatherData } from "./api.js";

async function mainpage() {
  const body = document.querySelector("body");

  const content = document.createElement("div");
  content.setAttribute("class", "main-container");
  body.appendChild(content);

  const title = document.createElement("h1");
  title.textContent = "Snowy's Weather Forecast";
  content.appendChild(title);

  const inputDiv = document.createElement("div");
  inputDiv.setAttribute("class", "input-container");
  content.appendChild(inputDiv);

  const input = document.createElement("input");
  input.setAttribute("class", "input-city");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Toronto");
  inputDiv.appendChild(input);

  const button = document.createElement("button");
  button.setAttribute("class", "confirm-button");
  button.textContent = "Submit";
  inputDiv.appendChild(button);

  button.addEventListener("click", () => {
    console.log("INPUT: " + input.value);
    if (input.value.length > 0) {
      weatherDiv.innerHTML = "";
      displayWeather(input.value, weatherDiv);
    }
  });

  const weatherDiv = document.createElement("div");
  weatherDiv.setAttribute("class", "weather-container");
  content.appendChild(weatherDiv);

  displayWeather("toronto", weatherDiv);

  //  console.log("JSON received:" + weatherObject.location);
}

async function displayWeather(location, content) {
  const weatherResult = await processWeatherData(location);
  //const keys = Object.keys(weatherResult);

  Object.entries(weatherResult).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
    const property = document.createElement("p");
    property.setAttribute("class", key);
    property.textContent = `${key}: ${value}`;
    content.appendChild(property);
  });
}

export { mainpage };
