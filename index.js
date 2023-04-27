const SHIFT_CHARS = {
  1: "!",
  2: "@",
  3: "#",
  4: "$",
  5: "%",
  6: "^",
  7: "&",
  8: "*",
  9: "(",
  0: ")",
  "`": "~",
  "-": "_",
  "=": "+",
  "[": "{",
  "]": "}",
  "\\": "|",
  ";": ":",
  "'": '"',
  ",": "<",
  ".": ">",
  "/": "?",
};

const keyboard = document.querySelector(".keys-container");
const textDisplay = document.querySelector(".text-display");
const clearBtn = document.querySelector(".clear-btn");

keyboard.addEventListener("click", handleKeyboardClick);
clearBtn.addEventListener("click", clearText);

function clearText() {
  textDisplay.innerHTML = "";
}

function handleKeyboardClick(event) {
  const { target } = event;
  const buttonValue = target.textContent;

  if (target.innerHTML === "Backspace" && textDisplay.innerHTML !== "") {
    deleteLastCharacter();
  } else if (target.innerHTML === "Space") {
    addSpace();
  } else if (target.innerHTML === "Enter") {
    textDisplay.innerHTML += "\n";
  } else if (target.innerHTML === "Tab") {
    textDisplay.innerHTML += "\t";
  } else if (target.tagName === "BUTTON" && target.innerHTML !== "Backspace") {
    handleTextEntry(buttonValue, target);
  }
}

function deleteLastCharacter() {
  textDisplay.innerHTML = textDisplay.innerHTML.slice(0, -1);
}

function addSpace() {
  textDisplay.innerHTML += " ";
}

function handleTextEntry(buttonValue, target) {
  if (target.innerHTML === "Caps Lock") {
    toggle(target, "caps-lock-on");
  } else if (target.innerHTML === "Shift") {
    toggle(target, "shift-on");
  } else {
    appendText(buttonValue);
  }
}

function toggle(target, className) {
  if (!target.classList.contains(className)) {
    target.classList.add(className);
    target.style.color = "green";
    textDisplay.classList.add(className);
  } else {
    target.classList.remove(className);
    target.style.color = "black";
    textDisplay.classList.remove(className);
  }
}

function appendText(buttonValue) {
  const capsLockOn = document.querySelector(".caps-lock-on");
  const shiftOn = document.querySelector(".shift-on");
  let updatedTextToAdd = "";
  if (capsLockOn && shiftOn) {
    if (isLetter(buttonValue)) {
      updatedTextToAdd = buttonValue;
    } else {
      updatedTextToAdd = SHIFT_CHARS[buttonValue];
    }
  } else if (capsLockOn) {
    updatedTextToAdd = buttonValue.toUpperCase();
  } else if (shiftOn) {
    if (isLetter(buttonValue)) {
      updatedTextToAdd = buttonValue.toUpperCase();
    } else {
      updatedTextToAdd = SHIFT_CHARS[buttonValue];
    }
  } else {
    updatedTextToAdd = buttonValue.toLowerCase();
  }

  textDisplay.innerHTML += updatedTextToAdd;
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
