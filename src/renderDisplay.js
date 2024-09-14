function mainpage() {
  const body = document.querySelector("body");
  const content = document.createElement("div");
  content.setAttribute("class", "main-container");

  const title = document.createElement("h1");
  title.textContent = "Snowy's Weather Forecast";

  content.appendChild(title);
  body.appendChild(content);
}

export { mainpage };
