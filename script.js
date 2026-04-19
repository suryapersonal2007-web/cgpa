let subjectCount = 0;

// Add subject row
function addSubject() {
subjectCount++;

const div = document.createElement("div");
div.className = "row";

div.innerHTML = ` <input type="text" placeholder="Subject ${subjectCount}">

```
<input type="number" placeholder="Credits" min="1">

<select>
  <option value="">Grade</option>
  <option value="10">O (10)</option>
  <option value="9">A+ (9)</option>
  <option value="8">A (8)</option>
  <option value="7">B+ (7)</option>
  <option value="6">B (6)</option>
  <option value="5">C (5)</option>
  <option value="0">F (0)</option>
</select>
```

`;

document.getElementById("subjects").appendChild(div);
}

// Calculate CGPA
function calculateCGPA() {
const rows = document.querySelectorAll(".row");

let totalCredits = 0;
let totalPoints = 0;

rows.forEach(row => {
const inputs = row.querySelectorAll("input, select");

```
const credit = parseFloat(inputs[1].value);
const grade = parseFloat(inputs[2].value);

if (!isNaN(credit) && !isNaN(grade)) {
  totalCredits += credit;
  totalPoints += credit * grade;
}
```

});

if (totalCredits === 0) {
document.getElementById("result").innerText = "Enter valid data!";
return;
}

const cgpa = (totalPoints / totalCredits).toFixed(2);

document.getElementById("result").innerText = "Your CGPA: " + cgpa;
}

// Add default 3 subjects on load
window.onload = () => {
addSubject();
addSubject();
addSubject();
};
