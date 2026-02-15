const display = document.getElementById("display");
const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");

let history = [];

/* ---------- CALCULATOR ---------- */
function append(value) {
  display.textContent =
    display.textContent === "0" ? value : display.textContent + value;
}

function clearAll() {
  display.textContent = "0";
}

function backspace() {
  display.textContent =
    display.textContent.length > 1
      ? display.textContent.slice(0, -1)
      : "0";
}

function calculate() {
  try {
    const exp = display.textContent;

    // prevent invalid expressions
    if (/[+\-*/.%]$/.test(exp)) return;

    const result = eval(exp);
    display.textContent = result;

    history.unshift(`${exp} = ${result}`);
    updateHistory();
  } catch {
    display.textContent = "Error";
  }
}

/* ---------- HISTORY ---------- */
function toggleHistory() {
  historyPanel.style.display =
    historyPanel.style.display === "block" ? "none" : "block";
}

function updateHistory() {
  historyList.innerHTML = "";
  history.slice(0, 10).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

/* ---------- THEME ---------- */
function toggleTheme() {
  document.body.classList.toggle("light");
}

/* ---------- KEYBOARD SUPPORT ---------- */
document.addEventListener("keydown", (e) => {
  e.preventDefault();

  if ("0123456789+-*/.%".includes(e.key)) append(e.key);
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clearAll();
});
