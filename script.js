const columns = document.querySelectorAll(".column");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock");
    node.classList.toggle("fa-lock-open");
  }

  if (type === "title") {
    copyToClick(event.target.textContent);
  }
});

function copyToClick(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColors() {
  columns.forEach((column) => {
    const text = column.querySelector("h2");
    const button = column.querySelector("button");
    const color = chroma.random();
    const isLocked = column.querySelector("i").classList.contains("fa-lock");

    if (isLocked) {
      return;
    }
    text.textContent = color.toString().toUpperCase();
    column.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();

  text.style.color = luminance > 0.5 ? "black" : "white";
}

setRandomColors();
