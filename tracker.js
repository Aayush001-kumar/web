// window.addEventListener("DOMContentLoaded", () => {
//   const startDate = new Date("2025-08-01");
//   const endDate = new Date("2026-01-31");
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const taskBox = document.getElementById("daily-task-box");

//   if (today < startDate || today > endDate) {
//     taskBox.innerHTML = `<p> No active NEET task for today.</p>`;
//     return;
//   }

//   const allTopics = [];
//   const prioritySubject = "Physics";

//   // Prioritize physics chapters first
//   const subjects = Object.keys(neetSyllabus);
//   subjects.sort((a, b) => {
//     if (a === prioritySubject) return -1;
//     if (b === prioritySubject) return 1;
//     return 0;
//   });

//   // Flatten the chapters: [ {subject, chapter} ]
//   subjects.forEach((subject) => {
//     neetSyllabus[subject].forEach((chapter) => {
//       allTopics.push({ subject, chapter });
//     });
//   });

//   const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
//   const topicsPerDay = Math.ceil(allTopics.length / totalDays);

//   const dayNumber = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
//   const startIndex = dayNumber * topicsPerDay;
//   const todayTopics = allTopics.slice(startIndex, startIndex + topicsPerDay);

//   // Load saved progress
//   const savedData = JSON.parse(localStorage.getItem("neet-task-" + today.toDateString())) || {
//     completed: false,
//     notes: ""
//   };

//   // Build UI
//   taskBox.innerHTML = `<h3>📅 Today's NEET Task</h3>`;
//   const list = document.createElement("ul");
//   todayTopics.forEach(topic => {
//     const item = document.createElement("li");
//     item.textContent = `${topic.subject}: ${topic.chapter}`;
//     list.appendChild(item);
//   });

//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.checked = savedData.completed;
//   checkbox.addEventListener("change", () => {
//     savedData.completed = checkbox.checked;
//     localStorage.setItem("neet-task-" + today.toDateString(), JSON.stringify(savedData));
//   });

//   const note = document.createElement("textarea");
//   note.placeholder = "Write what you found difficult...";
//   note.value = savedData.notes;
//   note.rows = 3;
//   note.addEventListener("input", () => {
//     savedData.notes = note.value;
//     localStorage.setItem("neet-task-" + today.toDateString(), JSON.stringify(savedData));
//   });

//   taskBox.appendChild(list);
//   taskBox.appendChild(document.createTextNode("✅ Mark as completed"));
//   taskBox.appendChild(checkbox);
//   taskBox.appendChild(document.createElement("br"));
//   taskBox.appendChild(document.createElement("br"));
//   taskBox.appendChild(note);
// });

document.getElementById("mark-complete").addEventListener("click", function() {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`task_complete_${today}`, "true");
    updateProgressBar(); // Call this function to update the bar
});
function updateProgressBar() {
    const startDate = new Date("2025-08-01");
    const today = new Date();
    const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

    let completed = 0;
    for (let i = 0; i < totalDays; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const key = `task_complete_${date.toISOString().split('T')[0]}`;
        if (localStorage.getItem(key) === "true") {
            completed++;
        }
    }

    const progress = (completed / totalDays) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
}

window.onload = updateProgressBar;
