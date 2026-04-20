// 👤 Current user
let currentUser = "";

// 📚 Semester Data
const semesters = {
  1: [
    { name: "Physics and Chemistry Laboratory", credit: 2 },
    { name: "Engineering Chemistry", credit: 3 },
    { name: "Python Programming", credit: 3 },
    { name: "Heritage of Tamils", credit: 1 },
    { name: "Python Lab", credit: 2 },
    { name: "English Lab", credit: 1 },
    { name: "Professional English", credit: 3 },
    { name: "Matrices and Calculus", credit: 4 },
    { name: "Engineering Physics", credit: 3 }
  ],
  2: [
    { name: "Professional English II", credit: 2 },
    { name: "Basic Electrical", credit: 3 },
    { name: "Programming in C", credit: 3 },
    { name: "C Lab", credit: 2 },
    { name: "Engineering Graphics", credit: 4 },
    { name: "Tamils and Technology", credit: 1 },
    { name: "Engineering Practices Lab", credit: 2 },
    { name: "Communication Lab", credit: 2 },
    { name: "Statistics", credit: 4 },
    { name: "Physics for IT", credit: 3 }
  ],
  3: [
    { name: "DSA Lab", credit: 2 },
    { name: "DSA", credit: 3 },
    { name: "Digital Principles", credit: 4 },
    { name: "Data Science", credit: 3 },
    { name: "Data Science Lab", credit: 2 },
    { name: "OOP Lab", credit: 1 },
    { name: "OOP", credit: 3 },
    { name: "Professional Development", credit: 1 },
    { name: "Discrete Math", credit: 4 }
  ],
  4: [
    { name: "Operating Systems", credit: 3 },
    { name: "Theory of Computation", credit: 3 },
    { name: "OS Lab", credit: 1 },
    { name: "DBMS Lab", credit: 1 },
    { name: "AI & ML", credit: 4 },
    { name: "DBMS", credit: 3 },
    { name: "Environmental Science", credit: 2 },
    { name: "Web Essentials", credit: 4 }
  ]
};

// 🔐 Login
function login() {
  const username = document.getElementById("username").value.trim();

  if (!username) {
    alert("Enter username!");
    return;
  }

  currentUser = username;
  localStorage.setItem("currentUser", currentUser);

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// 🔓 Logout
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

// 🔄 Auto login (FIXED: safe DOM loading)
window.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("currentUser");

  if (savedUser) {
    currentUser = savedUser;

    const loginBox = document.getElementById("loginBox");
    const app = document.getElementById("app");

    if (loginBox && app) {
      loginBox.style.display = "none";
      app.style.display = "block";
    }
  }
});

// 📚 Load Subjects
function loadSubjects() {
  const sem = document.getElementById("semester").value;
  const container = document.getElementById("subjects");
  const result = document.getElementById("result");

  container.innerHTML = "";
  result.innerText = "";

  if (!sem || !semesters[sem]) return;

  semesters[sem].forEach(sub => {
    const div = document.createElement("div");
    div.className = "row";

    div.innerHTML = `
      <input type="text" value="${sub.name}" disabled>
      <input type="number" class="credit" value="${sub.credit}" disabled>
      <input type="number" class="grade" min="0" max="10" placeholder="Grade">
    `;

    container.appendChild(div);
  });

  // 🔁 Load saved grades safely
  const saved = localStorage.getItem(`user_${currentUser}_sem_${sem}`);

  if (saved) {
    try {
      const grades = JSON.parse(saved);
      const inputs = container.querySelectorAll(".grade");

      inputs.forEach((input, i) => {
        input.value = grades[i] || "";
      });
    } catch (e) {
      console.error("Error loading saved data", e);
    }
  }
}

// 📊 Calculate CGPA + Save
function calculateCGPA() {
  const sem = document.getElementById("semester").value;
  const rows = document.querySelectorAll("#subjects .row");
  const result = document.getElementById("result");

  let totalCredits = 0;
  let totalPoints = 0;
  let grades = [];

  if (!sem) {
    result.innerText = "⚠️ Select semester!";
    return;
  }

  if (rows.length === 0) {
    result.innerText = "⚠️ No subjects found!";
    return;
  }

  rows.forEach(row => {
    const creditEl = row.querySelector(".credit");
    const gradeEl = row.querySelector(".grade");

    if (!creditEl || !gradeEl) return;

    const credit = parseFloat(creditEl.value);
    const grade = parseFloat(gradeEl.value);

    grades.push(gradeEl.value);

    if (!isNaN(grade) && grade >= 0 && grade <= 10) {
      totalCredits += credit;
      totalPoints += credit * grade;
    }
  });

  if (totalCredits === 0) {
    result.innerText = "⚠️ Enter valid grades!";
    return;
  }

  const cgpa = (totalPoints / totalCredits).toFixed(2);

  // 💾 Save safely
  try {
    localStorage.setItem(
      `user_${currentUser}_sem_${sem}`,
      JSON.stringify(grades)
    );
  } catch (e) {
    console.error("Storage error", e);
  }

  result.innerText = "🎯 CGPA: " + cgpa;
}