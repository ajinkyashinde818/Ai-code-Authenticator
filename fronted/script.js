let chart = null;

async function uploadFile() {
  const fileInput = document.getElementById("codeFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:5000/analyze", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  showResult(data.ai_percent);
}

async function analyzeText() {
  const codeText = document.getElementById("codeText").value.trim();

  if (!codeText) {
    alert("Please paste some code.");
    return;
  }

  const response = await fetch("http://127.0.0.1:5000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code: codeText })
  });

  const data = await response.json();
  showResult(data.ai_percent);
}

function showResult(aiPercent) {
  document.getElementById("percentText").textContent = `AI Usage: ${aiPercent}%`;

  const ctx = document.getElementById("aiChart").getContext("2d");

  if (chart) chart.destroy(); // reset chart if already exists

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["AI-Generated Code", "Human-Written Code"],
      datasets: [{
        data: [aiPercent, 100 - aiPercent],
        backgroundColor: ["#3b82f6", "#10b981"],
      }]
    },
    options: {
      animation: {
        animateScale: true
      },
      plugins: {
        legend: {
          labels: { color: "white" }
        }
      }
    }
  });
}

document.getElementById("uploadForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];
    formData.append("file", file);

    try {
        const response = await fetch("https://ai-code-authenticator.onrender.com/analyze", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        // Display result
        document.getElementById("result").innerHTML = `
            <h3>✅ AI Detection Result</h3>
            <p><strong>AI Usage:</strong> ${data.ai_percentage}%</p>
            <p><strong>Comment:</strong> ${data.comment}</p>
        `;

    } catch (err) {
        console.error("Error:", err);
        alert("Error connecting to backend. Please try again.");
    }
});
