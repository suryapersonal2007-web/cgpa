let subjectCount = 0;

// Add Subject Row
function addSubject() {
  subjectCount++;

  const div = document.createElement("div");
  div.className = "row";

  div.innerHTML = `
    <input class="subject" type="text" placeholder="Subject Name">
    <input class="credit" type="number" placeholder="Credits" min="1">

    <select class="grade">
      <option value="">Grade</option>
      <option value="10">O (10)</option>
      <option value="9">A+ (9)</option>
      <option value="8">A (8)</option>
      <option value="7">B+ (7)</option>
      <option value="6">B (6)</option>
      <option value="5">C (5)</option>
      <option value="0">F (0)</option>
    </select>

    <button class="remove-btn" onclick="this.parentElement.remove()">❌</button>
  `;

  document.getElementById("subjects").appendChild(div);
}

// Calculate CGPA
function calculateCGPA() {
  const rows = document.querySelectorAll(".row");

  let totalCredits = 0;
  let totalPoints = 0;
  let output = [];
  let subjectsData = [];

  const semester = document.querySelector('input[name="sem"]:checked');

  if (!semester) {
    document.getElementById("result").innerHTML = "⚠️ Select a semester!";
    return;
  }

  rows.forEach(row => {
    const subject = row.querySelector(".subject").value;
    const credit = parseFloat(row.querySelector(".credit").value);
    const grade = parseFloat(row.querySelector(".grade").value);

    if (subject && !isNaN(credit) && !isNaN(grade)) {
      totalCredits += credit;
      totalPoints += credit * grade;

      output.push(`${subject} (${credit} credits) → ${credit * grade} points`);

      subjectsData.push({ subject, credit, grade });
    }
  });

  if (totalCredits === 0) {
    document.getElementById("result").innerHTML = "Enter valid data!";
    return;
  }

  const cgpa = (totalPoints / totalCredits).toFixed(2);

  // Save data
  const data = {
    semester: semester.value,
    subjects: subjectsData,
    cgpa: cgpa
  };

  localStorage.setItem("semester_" + semester.value, JSON.stringify(data));

  document.getElementById("result").innerHTML =
    `<strong>Semester ${semester.value}</strong><br><br>` +
    output.join("<br>") +
    `<br><br><strong>CGPA: ${cgpa}</strong>`;
}

// Load Saved Semester Data
function loadSemesterData(sem) {
  const saved = localStorage.getItem("semester_" + sem);

  const container = document.getElementById("subjects");
  container.innerHTML = "";

  if (!saved) return;

  const data = JSON.parse(saved);

  data.subjects.forEach(sub => {
    addSubject();

    const lastRow = container.lastElementChild;

    lastRow.querySelector(".subject").value = sub.subject;
    lastRow.querySelector(".credit").value = sub.credit;
    lastRow.querySelector(".grade").value = sub.grade;
  });

  document.getElementById("result").innerHTML =
    `Loaded Semester ${sem} CGPA: <strong>${data.cgpa}</strong>`;
}

// Overall CGPA
function calculateOverallCGPA() {
  let total = 0;
  let count = 0;

  for (let i = 1; i <= 6; i++) {
    const data = localStorage.getItem("semester_" + i);

    if (data) {
      const parsed = JSON.parse(data);
      total += parseFloat(parsed.cgpa);
      count++;
    }
  }

  if (count === 0) {
    alert("No data found!");
    return;
  }

  const overall = (total / count).toFixed(2);
  alert("Overall CGPA: " + overall);
}

// Default subjects on load
window.onload = () => {
  addSubject();
  addSubject();
  addSubject();
  addSubject();
  addSubject();
  addSubject();
};