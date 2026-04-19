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

// Load Subjects when semester changes
function loadSubjects() {
    const sem = document.getElementById("semester").value;
    const container = document.getElementById("subjects");
    const result = document.getElementById("result");

    container.innerHTML = "";
    result.innerText = "";

    // Check valid semester
    if (!sem || !semesters[sem]) return;

    semesters[sem].forEach(sub => {
        const div = document.createElement("div");
        div.className = "row";

        // Fixed: Removed the triple backticks and correctly formatted the template literal
        div.innerHTML = `
            <input type="text" value="${sub.name}" disabled style="width: 250px;">
            <input type="number" class="credit" value="${sub.credit}" disabled style="width: 40px;">
            <input type="number" class="grade" min="0" max="10" placeholder="Grade (0-10)">
        `;

        container.appendChild(div);
    });
}

// Calculate GPA/CGPA
function calculateCGPA() {
    const rows = document.querySelectorAll("#subjects .row");
    const result = document.getElementById("result");

    let totalCredits = 0;
    let totalPoints = 0;

    // Check if semester is selected
    if (rows.length === 0) {
        result.innerText = "⚠️ Please select a semester first!";
        return;
    }

    rows.forEach(row => {
        const creditEl = row.querySelector(".credit");
        const gradeEl = row.querySelector(".grade");

        if (!creditEl || !gradeEl) return;

        const credit = parseFloat(creditEl.value);
        const grade = parseFloat(gradeEl.value);

        // Validate grade is between 0 and 10
        if (!isNaN(grade) && grade >= 0 && grade <= 10) {
            totalCredits += credit;
            totalPoints += credit * grade;
        }
    });

    // No valid grades entered
    if (totalCredits === 0) {
        result.innerText = "⚠️ Enter valid grades (0–10)!";
        return;
    }

    const cgpa = (totalPoints / totalCredits).toFixed(2);
    result.innerText = "🎯 Result: " + cgpa;
}