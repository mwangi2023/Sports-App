// ----------------- API BASE URL -----------------
const API_URL = "http://localhost:5000/api";

document.addEventListener("DOMContentLoaded", () => {
  // ----------------- REGISTER -----------------
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value;
      const message = document.getElementById("registerMessage");

      try {
        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();

        if (data.success) {
          message.textContent = "✅ Registration successful! Please login.";
          message.className = "success-message";
          setTimeout(() => (window.location.href = "login.html"), 1500);
        } else {
          message.textContent = `❌ ${data.error}`;
          message.className = "error-message";
        }
      } catch (err) {
        message.textContent = "❌ Server error. Try again later.";
        message.className = "error-message";
      }
    });
  }

  // ----------------- LOGIN -----------------
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const message = document.getElementById("loginMessage");

      try {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (data.success) {
          localStorage.setItem("token", data.token);
          window.location.href = "dashboard.html";
        } else {
          message.textContent = `❌ ${data.error}`;
          message.className = "error-message";
        }
      } catch (err) {
        message.textContent = "❌ Server error. Try again later.";
        message.className = "error-message";
      }
    });
  }

  // ----------------- DASHBOARD -----------------
  const workoutForm = document.getElementById("workoutForm");
  const workoutTable = document.getElementById("workoutTable");
  const logoutBtn = document.getElementById("logoutBtn");

  // Stats elements
  const totalWorkoutsEl = document.getElementById("totalWorkouts");
  const hoursWeekEl = document.getElementById("hoursWeek");
  const caloriesEl = document.getElementById("calories");

  // Chart element
  const workoutChartEl = document.getElementById("workoutChart");
  let workoutChart; // Chart.js instance

  if (workoutForm && workoutTable) {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "login.html";
      return;
    }

    // Fetch workouts
    async function loadWorkouts() {
      workoutTable.innerHTML = "";
      try {
        const res = await fetch(`${API_URL}/workouts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (data.success) {
          let totalWorkouts = data.workouts.length;
          let totalMinutesThisWeek = 0;
          let totalCalories = 0;
          const sportDurations = {};

          data.workouts.forEach((w) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${new Date(w.date).toLocaleDateString()}</td>
              <td>${w.sport}</td>
              <td>${w.duration} min</td>
              <td>${w.notes || "-"}</td>
              <td><button class="deleteBtn" data-id="${w._id}">❌</button></td>
            `;
            workoutTable.appendChild(row);

            // Stats calculations
            const workoutDate = new Date(w.date);
            const now = new Date();
            const weekAgo = new Date();
            weekAgo.setDate(now.getDate() - 7);

            if (workoutDate >= weekAgo) {
              totalMinutesThisWeek += parseInt(w.duration);
            }

            // Calories burned
            totalCalories += parseInt(w.duration) * 8;

            // For chart
            sportDurations[w.sport] = (sportDurations[w.sport] || 0) + parseInt(w.duration);
          });

          // Update stats
          if (totalWorkoutsEl) totalWorkoutsEl.textContent = totalWorkouts;
          if (hoursWeekEl) hoursWeekEl.textContent = (totalMinutesThisWeek / 60).toFixed(1);
          if (caloriesEl) caloriesEl.textContent = totalCalories;

          // Update chart
          if (workoutChartEl) {
            const ctx = workoutChartEl.getContext("2d");
            if (workoutChart) workoutChart.destroy(); // destroy old chart if exists
            workoutChart = new Chart(ctx, {
              type: "bar",
              data: {
                labels: Object.keys(sportDurations),
                datasets: [
                  {
                    label: "Minutes Spent",
                    data: Object.values(sportDurations),
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                  },
                ],
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
              },
            });
          }
        }
      } catch (err) {
        console.error("Error loading workouts:", err);
      }
    }

    loadWorkouts();

    // Add workout
    workoutForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const sport = document.getElementById("sportType").value;
      const duration = document.getElementById("duration").value;
      const notes = document.getElementById("notes").value;
      const msg = document.getElementById("workoutMessage");

      try {
        const res = await fetch(`${API_URL}/workouts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sport, duration, notes }),
        });
        const data = await res.json();

        if (data.success) {
          msg.textContent = "✅ Workout added!";
          msg.className = "success-message";
          loadWorkouts();
          workoutForm.reset();
        } else {
          msg.textContent = `❌ ${data.error}`;
          msg.className = "error-message";
        }
      } catch (err) {
        msg.textContent = "❌ Server error.";
        msg.className = "error-message";
      }
    });

    // Delete workout
    workoutTable.addEventListener("click", async (e) => {
      if (e.target.classList.contains("deleteBtn")) {
        const id = e.target.getAttribute("data-id");
        await fetch(`${API_URL}/workouts/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        loadWorkouts();
      }
    });

    // Logout
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
      });
    }
  }
});