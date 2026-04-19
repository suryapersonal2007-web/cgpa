// 📚 Semester Data (your subjects + credits)
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

// Load subjects when semester selected
function loadSubjects(sem) {
  const container = document.getElementById("subjects");
  container.innerHTML = "";

  if (!sem || !semesters[sem]) return;

  semesters[sem].forEach(sub => {
    const div = document.createElement("div");
    div.className = "row";

    div.innerHTML = `
      <input value="${sub.name}" disabled>
      <input value="${sub.credit}" disabled>
      <input type="number" min="0" max="10" placeholder="Grade (0-10)" class="grade">
    `;

    container.appendChild(div);
  });
}

// Calculate CGPA
function calculateCGPA() {
  const rows = document.querySelectorAll(".row");

  let totalCredits = 0;
  let totalPoints = 0;

  rows.forEach(row => {
    const inputs = row.querySelectorAll("input");

    const credit = parseFloat(inputs[1].value);
    const grade = parseFloat(inputs[2].value);

    // Validation
    if (!isNaN(grade) && grade >= 0 && grade <= 10) {
      totalCredits += credit;
      totalPoints += credit * grade;
    }
  });

  if (totalCredits === 0) {
    document.getElementById("result").innerText = "⚠️ Enter valid grades!";
    return;
  }

  const cgpa = (totalPoints / totalCredits).toFixed(2);

  document.getElementById("result").innerText = "CGPA: " + cgpa;
}