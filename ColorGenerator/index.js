const col = document.querySelectorAll(".block");

function generateColor() {
  const hex = "0123456789ABCDF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * hex.length)];
  }
  return "#" + color;
}

function getRandomColors() {
  col.forEach((col) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const color = generateColor();
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    if (isLocked) {
      return;
    }

    text.innerText = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });
}
getRandomColors();

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    getRandomColors();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    const i =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];
    i.classList.toggle("fa-lock-open");
    i.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClipboard(event.target.textContent);
  }
});

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}
