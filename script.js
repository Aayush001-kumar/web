// --- COUNTDOWN TIMER ---
const countdownDate = new Date("December 1, 2025 00:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance <= 0) {
        document.getElementById("timer").innerText = "Time's up!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);

    document.getElementById("timer").innerText =
        `${days}d ${hours}h ${minutes}m remaining`;
};

setInterval(updateCountdown, 1000);
updateCountdown();

// --- FOCUS TIMER SETUP ---
let focusTime = 25 * 60;
let timerInterval;
let isRunning = false;

const presetSelect = document.getElementById("preset-select");
const customInput = document.getElementById("custom-minutes");

presetSelect.addEventListener("change", () => {
    if (presetSelect.value === "custom") {
        customInput.style.display = "inline-block";
    } else {
        customInput.style.display = "none";
        focusTime = parseInt(presetSelect.value);
        updateFocusDisplay();
    }
});

customInput.addEventListener("input", () => {
    const customMinutes = parseInt(customInput.value);
    if (!isNaN(customMinutes) && customMinutes > 0) {
        focusTime = customMinutes * 60;
        updateFocusDisplay();
    }
});

function updateFocusDisplay() {
    const hours = Math.floor(focusTime / 3600);
    const minutes = Math.floor((focusTime % 3600) / 60);
    const seconds = focusTime % 60;

    updateFlip("hr", hours);
    updateFlip("min", minutes);
    updateFlip("sec", seconds);
}

function updateFlip(unit, value) {
    const front = document.getElementById(`${unit}-front`);
    const back = document.getElementById(`${unit}-back`);
    const card = document.getElementById(`${unit}-card`);

    const valStr = value.toString().padStart(2, '0');

    if (front.innerText !== valStr) {
        back.innerText = valStr;
        card.classList.add("flip");
        setTimeout(() => {
            front.innerText = valStr;
            card.classList.remove("flip");
        }, 600);
    }
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timerInterval = setInterval(() => {
        if (focusTime > 0) {
            focusTime--;
            updateFocusDisplay();
        } else {
            clearInterval(timerInterval);
            alert("Time's up Miyu! 🎉");
            isRunning = false;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    pauseTimer();
    focusTime = parseInt(presetSelect.value) || 25 * 60;
    updateFocusDisplay();
}

updateFocusDisplay();


function toggleMusic() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const getStoredDate = localStorage.getItem("lastUsedDate");
const todayDate = new Date().toLocaleDateString();

if (getStoredDate !== todayDate) {
    // Save today as last used
    localStorage.setItem("lastUsedDate", todayDate);

    const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

    // Auto-clear only on Monday
    if (dayName === "Monday") {
        days.forEach(day => {
            localStorage.removeItem(day);
        });
        console.log("Weekly planner cleared for new week ✅");
    }
}

// Function to update the progress bar based on checked items
document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    const id = checkbox.id;
    const saved = localStorage.getItem(id);
    if (saved === "true") {
        checkbox.checked = true;
    }
    checkbox.addEventListener("change", () => {
        localStorage.setItem(id, checkbox.checked);
        generateSmartSuggestions();
        updateProgressBar(); // 🆕 Call the progress bar function
    });
});

function generateSmartSuggestions() {
    const allLabels = document.querySelectorAll("label input[type='checkbox']");
    const uncheckedTopics = [];

    allLabels.forEach(cb => {
        if (!cb.checked && cb.id) {
            const label = document.querySelector(`label[for="${cb.id}"]`) || cb.parentElement;
            if (label) uncheckedTopics.push(label.textContent.trim());
        }
    });

    let suggestionHTML = "";

    if (uncheckedTopics.length === 0) {
        suggestionHTML = "✨ You're all caught up, Miyu! Take a break or revise something light today.";
    } else {
        const randomSuggestions = uncheckedTopics.sort(() => 0.5 - Math.random()).slice(0, 5);
        suggestionHTML = `
        Based on your progress, here’s what you can focus on next:
        <ul>
          ${randomSuggestions.map(topic => `<li>${topic}</li>`).join("")}
        </ul>
      `;
    }

    document.getElementById("suggestions").innerHTML = suggestionHTML;
}

// Run when page loads
generateSmartSuggestions();
const checkbox = document.getElementById("your-checkbox-id");
if (checkbox) {
    checkbox.addEventListener("change", () => {
        localStorage.setItem(id, checkbox.checked);
        generateSmartSuggestions();
    });
}


const itachiQuotes = [
    "Those who turn their hands against their comrades are sure to die a terrible death.",
    "Knowledge and awareness are vague, and perhaps better called illusions.",
    "My Motto Is To Be Stronger Than Yesterday. If I Have To, I will Be Stronger Than Half a Day Ago, Even a Minute Ago!",
    "You and I are flesh and blood. I'm always going to be there for you.",
    "Even the strongest of opponents always have a weakness, Even neet.",
    "No matter what darkness or contradictions lie within the world, you are still Miyu the bender of the faith.",
    "The Ticket To the Future Is Always Blank.",
    "The Moment You Think of Giving Up, Think of the Reason Why You Held on So Long.",
    "You Can’t Gain Anything Without Losing Something First.",
    "Remember the Lesson, Not the Disappointment.",
    "If something is possible, carry on as planned. Even if it isn't possible, do it anyway.",
    "Give up on your dreams and die.",
    "You can’t sit around envying other people’s worlds. You have to go out and change your own.",
];

function showRandomQuote() {
    const quoteBox = document.getElementById("anime-quote");
    const random = itachiQuotes[Math.floor(Math.random() * itachiQuotes.length)];
    quoteBox.innerText = `"${random}"`;
}

document.addEventListener("DOMContentLoaded", () => {
    const quoteBox = document.getElementById("anime-quote");
    const random = itachiQuotes[Math.floor(Math.random() * itachiQuotes.length)];
    quoteBox.innerText = `"${random}"`;
    quoteBox.style.opacity = "0";
    setTimeout(() => {
        quoteBox.style.opacity = "1";
    }, 100); // Slight delay for fade-in
});
function loadVideo(videoId) {
    const player = document.getElementById('motivational-video');
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}
function showLofi() {
    document.getElementById('lofi-section').style.display = 'block';
    document.getElementById('motivation-section').style.display = 'none';
}

function showMotivation() {
    document.getElementById('lofi-section').style.display = 'none';
    document.getElementById('motivation-section').style.display = 'block';
}

function loadVideo(videoId) {
    const player = document.getElementById('motivational-video');
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

window.onload = function () {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const taskData = neetRoadmap[todayStr];
    const taskBox = document.getElementById("today-task");

    if (taskData) {
        const { subject, chapter, topics, task } = taskData;

        const html = `
      <p><strong>📘 Subject:</strong> ${subject}</p>
      <p><strong>📖 Chapter:</strong> ${chapter}</p>
      <p><strong>🧩 Topics:</strong> ${topics.join(", ")}</p>
      <p><strong>📌 Task:</strong> ${task}</p>
      <textarea id="note" placeholder="Write where you got stuck..."></textarea>
      <button onclick="markAsDone()">✅ Mark as Done</button>
    `;

        taskBox.innerHTML = html;

        // Load saved note if available
        const savedNote = localStorage.getItem(todayStr + "_note");
        if (savedNote) {
            document.getElementById("note").value = savedNote;
        }
    } else {
        taskBox.innerHTML = "<p>No task scheduled for today 📭</p>";
    }
};

// window.markAsDone = function () {
//     const note = document.getElementById("note").value;
//     localStorage.setItem(todayStr + "_note", note);
//     localStorage.setItem(todayStr + "_done", "true");
//     alert("Task marked as done and note saved! ✅");
// };
// Firebase Config
// Firebase Initialization
const firebaseConfig = {
    apiKey: "AIzaSyBatUKafjs0bZ-yRHbTksk8v9vY8qfQyN0",
    authDomain: "neet-tracker-bef77.firebaseapp.com",
    projectId: "neet-tracker-bef77",
    storageBucket: "neet-tracker-bef77.firebasestorage.app",
    messagingSenderId: "1059208833075",
    appId: "1:1059208833075:web:801f8012489d9dc660db46",
    measurementId: "G-7N095EV8P9"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Update Chapter Options on Subject Change
document.getElementById("subject").addEventListener("change", () => {
    const subject = document.getElementById("subject").value;
    const chapterSelect = document.getElementById("chapter");

    // Clear previous options
    chapterSelect.innerHTML = "";

    // Check if the subject has chapters
    if (!syllabus[subject]) {
        console.warn(`No chapters found for subject: ${subject}`);
        return;
    }

    // Add chapter options
    syllabus[subject].forEach(ch => {
        const opt = document.createElement("option");
        opt.value = ch;
        opt.textContent = ch;
        chapterSelect.appendChild(opt);
    });

    // Debugging
    console.log(`✅ Loaded ${chapterSelect.options.length} chapters for ${subject}`);
});

// Trigger default population on load
document.getElementById("subject").dispatchEvent(new Event("change"));


// Toast Popup Function
function showToast(message, duration = 3000) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #2ecc71;
    color: white;
    padding: 12px 20px;
    border-radius: 10px;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = "1");

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Save Difficulty Logic (One-time listener)
function setupSaveButton() {
    const saveBtn = document.getElementById("save-difficulty");

    // Clear previous listeners if any
    const newBtn = saveBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newBtn, saveBtn);

    newBtn.addEventListener("click", async () => {
        const subject = document.getElementById("subject").value;
        const chapter = document.getElementById("chapter").value;
        const note = document.getElementById("difficulty-note").value.trim();
        const level = document.getElementById("level").value;

        if (!note) {
            showToast("⚠️ Please enter the difficulty note!", 4000);
            return;
        }

        try {
            await db.collection("difficultyLogs").add({
                subject,
                chapter,
                note,
                level,
                timestamp: new Date()
            });

            showToast("✅ Difficulty saved!", 3000);
            document.getElementById("difficulty-note").value = "";
        } catch (e) {
            console.error("Error saving:", e);
            showToast("❌ Failed to save. Try again.", 4000);
        }
    });
}

// Setup once DOM is ready
window.addEventListener("DOMContentLoaded", () => {
    setupSaveButton();
});


function handleSaveDifficultyClick(event) {
    console.log("[LOG] Save button clicked");

    const subject = document.getElementById("subject").value;
    const chapter = document.getElementById("chapter").value;
    const note = document.getElementById("difficulty-note").value.trim();
    const level = document.getElementById("level").value;

    if (!note) {
        alert("Please enter the difficulty note.");
        return;
    }

    db.collection("difficultyLogs")
        .add({
            subject,
            chapter,
            note,
            level,
            timestamp: new Date()
        })
        .then(() => {
            alert("✅ Saved successfully!");
            document.getElementById("difficulty-note").value = "";
        })
        .catch((error) => {
            console.error("❌ Error saving:", error);
            alert("Failed to save. Try again.");
        });
}

// REMOVE all existing listeners completely by cloning the button
const saveBtn = document.getElementById("save-difficulty");
const newSaveBtn = saveBtn.cloneNode(true); // No listeners!
saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);

// ADD just one click listener
newSaveBtn.addEventListener("click", handleSaveDifficultyClick);


const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
const storedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
const backlogContainer = document.getElementById("backlog-tasks");
const todayContainer = document.getElementById("today-task");

const backlog = document.getElementById("backlogContainer");
function updateBacklogsAndToday() {
    if (!backlogContainer || !todayContainer) return;

    backlogContainer.innerHTML = "";
    todayContainer.innerHTML = "";

    for (const [date, task] of Object.entries(storedTasks)) {
        if (!task.completed && date < today) {
            const div = document.createElement("div");
            div.className = "backlog-item";
            div.innerHTML = `<strong>${date}:</strong> ${task.topic} 
                             <button onclick="markAsDone('${date}')">✅ Mark Done</button>`;
            backlogContainer.appendChild(div);
        }
    }

    if (!storedTasks[today]) {
        storedTasks[today] = {
            topic: "Your AI-generated or custom planner task here",
            completed: false
        };
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    const todayTask = storedTasks[today];
    todayContainer.innerHTML = `
        <div class="task-box">
            <strong>${today}:</strong> ${todayTask.topic}
            <button onclick="markAsDone('${today}')">✅ Mark Done</button>
        </div>`;
}


function markAsDone(date) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[date].completed = true;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateBacklogsAndToday(); // Refresh UI
}

updateBacklogsAndToday();

async function fetchLogs(subjectFilter = "All") {
    const logsContainer = document.getElementById("logs-container");
    logsContainer.innerHTML = "Loading...";

    try {
        let query;

        if (subjectFilter === "All") {
            query = db.collection("difficultyLogs").orderBy("timestamp", "desc");
        } else {
            query = db.collection("difficultyLogs").where("subject", "==", subjectFilter);
            // Optional: You could add orderBy("timestamp") here, but only if you've created Firestore indexes
        }

        const snapshot = await query.get();
        logsContainer.innerHTML = "";

        if (snapshot.empty) {
            logsContainer.innerHTML = "<p>No logs found.</p>";
            return;
        }

        snapshot.forEach(doc => {
            const data = doc.data();
            const entry = document.createElement("div");
            entry.className = "log-entry";
            entry.innerHTML = `
                <h4>${data.subject} - ${data.chapter}</h4>
                <p><strong>Level:</strong> ${data.level}</p>
                <p><strong>Note:</strong> ${data.note}</p>
                <p><small>${data.timestamp?.toDate ? new Date(data.timestamp.toDate()).toLocaleString() : "No time"}</small></p>
            `;
            logsContainer.appendChild(entry);
        });

    } catch (error) {
        console.error("Error fetching logs:", error);
        logsContainer.innerHTML = "<p>Error loading logs.</p>";
    }
}
document.getElementById("log-subject-filter").addEventListener("change", (e) => {
    fetchLogs(e.target.value);
});
document.getElementById("view-logs").addEventListener("click", () => {
    const filter = document.getElementById("log-subject-filter").value;
    fetchLogs(filter);
});

const subjectEl = document.getElementById("subject");
const chapterEl = document.getElementById("chapter");

function populateChapters() {
    const subject = subjectEl.value;
    chapterEl.innerHTML = "";
    if (syllabus[subject]) {
        syllabus[subject].forEach(ch => {
            const option = document.createElement("option");
            option.value = ch;
            option.textContent = ch;
            chapterEl.appendChild(option);
        });
    }
}

subjectEl.addEventListener("change", populateChapters);
populateChapters(); // Call on page load

updateProgressBar();

if (!taskData) {
  taskBox.innerHTML = "<p>No task scheduled for today 📭</p>";
  console.warn(`No task found for ${todayStr} in neetRoadmap`);
}

const { subject, chapter, topics, task, videos = [] } = taskData;

let videoHTML = "";
if (videos.length > 0) {
  videoHTML = `<p><strong>📽️ Videos:</strong><ul>` +
    videos.map(url => `<li><a href="${url}" target="_blank">${url}</a></li>`).join("") +
    `</ul></p>`;
}
