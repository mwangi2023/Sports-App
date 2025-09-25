// Toggle pages
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

// Backend API base URL
const API_URL = "http://localhost:5000/api";

// Register function
async function register(event) {
  event.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(${API_URL}/auth/register, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  if (res.ok) {
    alert("Registered successfully!");
    showPage("login");
  } else {
    alert("Registration failed!");
  }
}

// Login function
async function login(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(${API_URL}/auth/login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (res.ok) {
    const data = await res.json();
    alert("Login successful! Token: " + data.token);
    localStorage.setItem("token", data.token);
    showPage("home");
  } else {
    alert("Login failed!");
  }
}