import { processWeatherData } from "./api.js";

async function mainpage() {
  const body = document.querySelector("body");

  const content = document.createElement("div");
  content.setAttribute("class", "main-container");
  body.appendChild(content);

  const title = document.createElement("h1");
  title.textContent = "Snowy's Weather Forecast";
  content.appendChild(title);

  const inputDiv = document.createElement("form");
  inputDiv.setAttribute("class", "input-container");
  content.appendChild(inputDiv);

  const input = document.createElement("input");
  input.setAttribute("class", "input-city");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Type location here...");
  inputDiv.appendChild(input);

  const button = document.createElement("button");
  button.setAttribute("class", "confirm-button");
  button.textContent = "Submit";
  inputDiv.appendChild(button);

  button.addEventListener("click", (e) => {
    console.log("INPUT: " + input.value);
    if (input.value.length > 0) {
      weatherDiv.innerHTML = "";
      displayWeather(input.value, weatherDiv);
    }
    e.preventDefault();
  });

  const weatherDiv = document.createElement("div");
  weatherDiv.setAttribute("class", "weather-container");
  content.appendChild(weatherDiv);

  displayWeather("toronto", weatherDiv);

  const author = document.createElement("p");
  author.setAttribute("class", "author");
  author.innerHTML =
    'made by: <a href="https://github.com/ADDikt88/" target="_blank">github/ADDikt88</a>';
  author.style.fontSize = "0.8rem";
  author.style.marginTop = "auto";

  content.appendChild(author);

  //  console.log("JSON received:" + weatherObject.location);
}

async function displayWeather(location, content) {
  try {
    const weatherResult = await processWeatherData(location);
    const keys = Object.keys(weatherResult);
    const labels = [
      "Location",
      "Condition",
      "Temperature",
      "Feels Like",
      "Chance of Precipitation",
      "Tomorrow's Weather",
      "Temperature High",
      "Temperature Low",
      "Chance of Precipitation",
    ];

    keys.forEach((key, index) => {
      console.log(`${key}: ${weatherResult[key]}`);
      const property = document.createElement("p");
      property.setAttribute("class", key);
      if (index == 0) {
        property.textContent = `${weatherResult[key]}`;
        property.style.fontSize = "1.2rem";
        property.style.fontWeight = "bold";
      } else if (index == 5) {
        const tomorrowHeading = document.createElement("p");
        tomorrowHeading.textContent = "Tomorrow";
        tomorrowHeading.style.fontSize = "1.1rem";
        tomorrowHeading.style.fontStyle = "italic";
        tomorrowHeading.style.textDecoration = "underline";
        content.appendChild(tomorrowHeading);
        property.textContent = `${weatherResult[key]}`;
      } else {
        property.textContent = `${labels[index]}: ${weatherResult[key]}`;
      }
      if (index == 4) {
        property.style.marginBottom = "20px";
      }
      content.appendChild(property);
    });
    //   Object.entries(weatherResult).forEach(([key, value]) => {
    //     console.log(`${key}: ${value}`);
    //     const property = document.createElement("p");
    //     property.setAttribute("class", key);
    //     property.textContent = `${key}: ${value}`;
    //     content.appendChild(property);
    //   });
  } catch (error) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = `We could not find '${location}'...`;
    content.appendChild(errorMessage);
    console.error("Caught an error: ", error);
  }
}

export { mainpage };
