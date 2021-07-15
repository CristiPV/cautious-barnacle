const canvas = document.getElementById("canvas");
const canvasSize = 1000;
canvas.width = canvasSize;
canvas.height = canvasSize;

const ctx = canvas.getContext("2d");
const lineHeight = 7; // Pixels
const textOffset = 200;

let font = "Arial";
let fontSize = 50; // Pixels
let fontColor = "black";
let isMirrored = false;
let textStart = canvasSize / 2;

// Default context
ctx.fillStyle = fontColor;
ctx.textAlign = "center";
ctx.font = `${fontSize}px ${font}`;

function updateText() {
  if (isMirrored) {
    mirrorText();
  } else {
    writeText();
  }
}

function writeText() {
  if (isMirrored) {
    ctx.textAlign = "center";
    textStart = canvasSize / 2;
    isMirrored = false;
  }
  const input = document.getElementById("text-input").value;
  const text = wrapText(input);

  resetCanvas();
  ctx.save();

  ctx.translate(textStart, fontSize + 1);
  let height = 0;
  for (line of text) {
    ctx.fillText(line, 0, height);
    height += fontSize + lineHeight;
  }

  ctx.restore();
}

function mirrorText() {
  if (!isMirrored) {
    ctx.textAlign = "center";
    textStart = canvasSize / 2;
    isMirrored = true;
  }
  const input = document.getElementById("text-input").value;
  const text = wrapText(input);

  resetCanvas();
  ctx.save();

  ctx.translate(textStart, fontSize + 1);
  ctx.scale(-1, 1);
  let height = 0;
  for (line of text) {
    ctx.fillText(line, 0, height);
    height += fontSize + lineHeight;
  }

  ctx.restore();
}

function wrapText(text) {
  const lines = [];
  const words = text.split(" ");

  let currentLine = "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (
      ctx.measureText(currentLine + " " + word).width <
      canvas.width - textOffset
    ) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine.trim());
      currentLine = word;
    }
  }
  lines.push(currentLine.trim());

  return lines;
}

function alignText(position) {
  console.log("Position:", position);
  switch (position) {
    case "left":
      ctx.textAlign = isMirrored ? "right" : "left";
      textStart = 50;
      break;
    case "right":
      ctx.textAlign = isMirrored ? "left" : "right";
      textStart = canvasSize - 50;
      break;
    default:
      ctx.textAlign = "center";
      textStart = canvasSize / 2;
  }
  updateText();
}

function updateFont() {
  font = document.getElementById("font-select").value;
  ctx.font = `${fontSize}px ${font}`;

  updateText();
}

function updateFontSize() {
  fontSize = Number(document.getElementById("font-range").value);
  ctx.font = `${fontSize}px ${font}`;

  updateText();
}

function updateFontColor() {
  fontColor = document.getElementById("font-color").value;
  ctx.fillStyle = fontColor;

  updateText();
}

function resetCanvas() {
  ctx.save();

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  ctx.restore();
}

function downloadCanvas() {
  const downloadButton = document.getElementById("download");
  const image = canvas.toDataURL("image/png", 1.0);
  downloadButton.download = "text-image.png";
  downloadButton.href = image;
}
