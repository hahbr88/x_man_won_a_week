function calculateSum(data) {
  return Object.values(data).reduce((acc, val) => acc + (Number(val) || 0), 0);
}

function updateDisplay(sum) {
  document.getElementById(
    "totalSum"
  ).innerText = `Total: ${sum.toLocaleString()} 원`;
}

function handleInputChange() {
  const data = {
    monday: document.getElementById("monday").value,
    tuesday: document.getElementById("tuesday").value,
    wednesday: document.getElementById("wednesday").value,
    thursday: document.getElementById("thursday").value,
    friday: document.getElementById("friday").value,
  };

  const sum = calculateSum(data);

  updateDisplay(sum);

  localStorage.setItem("weeklyNumbers", JSON.stringify(data));
}

["monday", "tuesday", "wednesday", "thursday", "friday"].forEach((day) => {
  document.getElementById(day).addEventListener("change", handleInputChange);
});

document.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("weeklyNumbers")) || {};
  ["monday", "tuesday", "wednesday", "thursday", "friday"].forEach((day) => {
    if (savedData[day]) {
      document.getElementById(day).value = savedData[day];
    }
  });

  const sum = calculateSum(savedData);
  updateDisplay(sum);
});
