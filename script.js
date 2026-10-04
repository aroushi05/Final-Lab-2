
// getElementById
const beginBtn = document.getElementById("beginBtn");
const verdictCard = document.getElementById("verdictCard");
const verdictBody = document.getElementById("verdictBody");
const againBtn = document.getElementById("againBtn");


// ---------- Input collection with basic validation ----------

function getValidName() {
  let name;
  while (true) {
    name = prompt("Enter your full name:");

    if (name === null) {
      return null; 
    }

    name = name.trim();

    if (name === "") {
      alert("Name cannot be empty. Please try again.");
      continue;
    }

    return name;
  }
}

// Keeps asking until a valid score (0 < score <= 100) is given, or the user cancels.
function getValidScore() {
  let input;
  while (true) {
    input = prompt("Enter your score (0-100):");

    if (input === null) {
      return null;
    }

    input = input.trim();

    if (input === "") {
      alert("Score cannot be empty. Please try again.");
      continue;
    }

    const num = Number(input);

    if (isNaN(num)) {
      alert("Score must be a valid number. Please try again.");
      continue;
    } else if (num === 0) {
      alert("Score cannot be zero. Please enter a valid score.");
      continue;
    } else if (num < 0) {
      alert("Score cannot be negative. Please try again.");
      continue;
    } else if (num > 100) {
      alert("Score cannot exceed 100. Please try again.");
      continue;
    }

    return num;
  }
}


// Evaluates a score and returns a score
function evaluateScore(score) {
  if (typeof score !== "number" || isNaN(score) || score <= 0 || score > 100) {
    return "Invalid score";
  } else if (score >= 90) {
    return "Excellent";
  } else if (score >= 75) {
    return "Passed";
  } else {
    return "Failed";
  }
}

// Maps a remark to the CSS class that styles its verdict card.
function getVerdictClass(remark) {
  if (remark === "Excellent") {
    return "verdict-excellent";
  } else if (remark === "Passed") {
    return "verdict-passed";
  } else if (remark === "Failed") {
    return "verdict-failed";
  } else {
    return "verdict-invalid";
  }
}

// ---------- Display ----------

function showVerdict(name, score, remark) {
  verdictCard.hidden = false;
  verdictCard.className = "card verdict-card " + getVerdictClass(remark);

  verdictBody.innerHTML =
    '<p class="verdict-line"><span class="label">Name:</span> <span class="value"></span></p>' +
    '<p class="verdict-line"><span class="label">Score:</span> <span class="value"></span></p>' +
    '<p class="verdict-remark"></p>';

  // querySelectorAll 
  const values = verdictBody.querySelectorAll(".value");
  values[0].textContent = name;
  values[1].textContent = score;

  // querySelector 
  verdictBody.querySelector(".verdict-remark").textContent = remark;

  againBtn.hidden = false;
  verdictCard.scrollIntoView({ behavior: "smooth", block: "center" });
}

function showMessage(message) {
  verdictCard.hidden = false;
  verdictCard.className = "card verdict-card verdict-invalid";
  verdictBody.innerHTML = '<p class="verdict-remark"></p>';
  verdictBody.querySelector(".verdict-remark").textContent = message;
  againBtn.hidden = false;
  verdictCard.scrollIntoView({ behavior: "smooth", block: "center" });
}


function runEvaluation() {
  alert("Welcome to the Score Evaluator.\nYou will be asked for your name and your score.");

  const name = getValidName();
  if (name === null) {
    showMessage("Evaluation cancelled. No name was provided.");
    return;
  }

  const score = getValidScore();
  if (score === null) {
    showMessage("Evaluation cancelled. No score was provided.");
    return;
  }

  const proceed = confirm("Hello, " + name + ". Your score is " + score + ". Proceed to see your result?");
  if (!proceed) {
    showMessage("Evaluation cancelled, " + name + ". Your result was not revealed.");
    return;
  }

  const remark = evaluateScore(score);
  showVerdict(name, score, remark);
}

beginBtn.addEventListener("click", runEvaluation);

againBtn.addEventListener("click", function () {
  verdictCard.hidden = true;
  againBtn.hidden = true;
  runEvaluation();
});
