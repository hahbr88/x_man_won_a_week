const calculateSum = (data) => {
  const sum = Object.values(data).reduce(
    (acc, val) => acc + (Number(val) || 0),
    0
  );
  return Object.values(data).reduce((acc, val) => acc + (Number(val) || 0), 0);
};

const updateDisplay = (sum) => {
  const budget = localStorage.getItem("budget");
  if (sum > budget) {
    const excessAmount = sum - budget;
    document.getElementById(
      "totalSum"
    ).innerText = `${budget.toLocaleString()} 원 에서  ${excessAmount.toLocaleString()} 원 초과하였습니다.`;
  } else {
    document.getElementById(
      "totalSum"
    ).innerText = `총 ${sum.toLocaleString()} 원 사용, 남은 금액 ${(
      budget - sum
    ).toLocaleString()} 원`;
  }
};

const setBudget = () => {
  const budget = document.getElementById("budget").value;
  localStorage.setItem("budget", budget);
};

const handleInputChange = () => {
  const data = {
    monday: document.getElementById("monday").value,
    tuesday: document.getElementById("tuesday").value,
    wednesday: document.getElementById("wednesday").value,
    thursday: document.getElementById("thursday").value,
    friday: document.getElementById("friday").value,
  };

  const sum = calculateSum(data);

  updateDisplay(sum);

  localStorage.setItem("weeklyPrices", JSON.stringify(data));
};

document.getElementById("budget").addEventListener("change", setBudget);

["monday", "tuesday", "wednesday", "thursday", "friday"].forEach((day) => {
  document.getElementById(day).addEventListener("change", handleInputChange);
});

const resetValues = () => {
  if (confirm("일주일치 금액을 초기화합니다.")) {
    const data = {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
    };

    Object.keys(data).forEach((day) => {
      document.getElementById(day).value = "";
    });

    updateDisplay(0);

    localStorage.removeItem("weeklyPrices");
  }
};

document.getElementById("resetButton").addEventListener("click", resetValues);

document.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("weeklyPrices")) || {};
  ["monday", "tuesday", "wednesday", "thursday", "friday"].forEach((day) => {
    if (savedData[day]) {
      document.getElementById(day).value = savedData[day];
    }
  });

  const sum = calculateSum(savedData);
  document.getElementById("budget").value = localStorage.getItem("budget");
  updateDisplay(sum);
});
