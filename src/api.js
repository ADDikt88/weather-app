// function grabLocation(jsonObject) {
//   let location = jsonObject.resolvedAddress;
//   return { location };
// }
function WeatherObject(
  location,
  currentCondition,
  currentTemperature,
  currentFeelsLike,
  currentPrecipProb,
  tomorrowDescription,
  tomorrowHigh,
  tomorrowLow,
  tomorrowPrecipProb
) {
  this.location = location;
  this.currentCondition = currentCondition;
  this.currentTemperature = currentTemperature;
  this.currentFeelsLike = currentFeelsLike;
  this.currentPrecipProb = currentPrecipProb;
  this.tomorrowDescription = tomorrowDescription;
  this.tomorrowHigh = tomorrowHigh;
  this.tomorrowLow = tomorrowLow;
  this.tomorrowPrecipProb = tomorrowPrecipProb;
}

async function processWeatherData(location) {
  const jsonObject = await getWeatherData(location);
  let weatherObject = new WeatherObject();
  weatherObject.location = jsonObject.resolvedAddress;
  weatherObject.currentCondition = jsonObject.currentConditions.conditions;
  weatherObject.currentTemperature =
    jsonObject.currentConditions.temp + " \xB0" + "C";
  weatherObject.currentFeelsLike =
    jsonObject.currentConditions.feelslike + " \xB0" + "C";
  weatherObject.currentPrecipProb =
    jsonObject.currentConditions.precipprob + "%";

  weatherObject.tomorrowDescription = jsonObject.days[1].description;
  weatherObject.tomorrowHigh = jsonObject.days[1].tempmax + " \xB0" + "C";
  weatherObject.tomorrowLow = jsonObject.days[1].tempmin + " \xB0" + "C";
  weatherObject.tomorrowPrecipProb = jsonObject.days[1].precipprob + "%";

  return weatherObject;
}

async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=B99UFL2E4DRCK99FA2S5ERGTZ&contentType=json`
  );
  const json = await response.json();
  console.log(json);
  return json;
}

export { processWeatherData };
