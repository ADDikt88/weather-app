// function grabLocation(jsonObject) {
//   let location = jsonObject.resolvedAddress;
//   return { location };
// }
function WeatherObject(
  location,
  description,
  currentCondition,
  datetime,
  temperature,
  feelsLike
) {
  this.location = location;
  this.description = description;
  this.currentCondition = currentCondition;
  this.datetime = datetime;
  this.temperature = temperature;
  this.feelsLike = feelsLike;
}

async function processWeatherData(location) {
  const jsonObject = await getWeatherData(location);
  let weatherObject = new WeatherObject();
  weatherObject.location = jsonObject.resolvedAddress;
  weatherObject.description = jsonObject.description;
  weatherObject.currentCondition = jsonObject.currentConditions.conditions;
  weatherObject.datetime = jsonObject.currentConditions.datetime;
  weatherObject.temperature = jsonObject.currentConditions.temp;
  weatherObject.feelsLike = jsonObject.currentConditions.feelslike;

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
