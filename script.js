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

/**
 * Load Subjects when semester changes
 * 'sem' is passed directly from the HTML: loadSubjects(this.value)
 */
function loadSubjects(sem) {
    const container = document.getElementById("subjects");
    const result = document.getElementById("result");

    // Clear previous subjects and old results
    container.innerHTML = "";
    result.innerText = "";

    // If "Select Semester" (empty value) is picked, stop here
    if (!sem || !semesters[sem]) return;

    semesters[sem].forEach(sub => {
        const div = document.createElement("div");
        div.className = "row";

        div.innerHTML = `
            <input type="text" value="${sub.name}" disabled>
            <input type="number" class="credit" value="${sub.credit}" disabled>
            <input type="number" class="grade" min="0" max="10" placeholder="Enter Grade">
        `;

        container.appendChild(div);
    });
}

/**
 * Calculate the GPA for the loaded rows
 */
function calculateCGPA() {
    const rows = document.querySelectorAll("#subjects .row");
    const result = document.getElementById("result");

    let totalCredits = 0;
    let totalPoints = 0;

    // Check if subjects are loaded
    if (rows.length === 0) {
        result.innerHTML = "⚠️ Please select a semester first!";
        return;
    }

    rows.forEach(row => {
        const creditEl = row.querySelector(".credit");
        const gradeEl = row.querySelector(".grade");

        if (creditEl && gradeEl) {
            const credit = parseFloat(creditEl.value);
            const grade = parseFloat(gradeEl.value);

            // validate grade input
            if (!isNaN(grade) && grade >= 0 && grade <= 10) {
                totalCredits += credit;
                totalPoints += credit * grade;
            }
        }
    });

    // Check if user actually typed any grades
    if (totalCredits === 0) {
        result.innerHTML = "⚠️ Enter valid grades (0–10) to calculate!";
        return;
    }

    const gpa = (totalPoints / totalCredits).toFixed(2);
    result.innerHTML = "🎯 Your GPA: " + gpa;
}