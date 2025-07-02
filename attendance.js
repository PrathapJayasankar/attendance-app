let serial = 1;
let currentDate = getTodayDate(); // Default to today
let attendanceData = {}; // Store attendance by date

// ✅ Custom player list
const defaultPlayers = [
    "Inba", "Jim", "Kathir", "Shailu", "Sheyam", "Harish", "Jeeva", "Mithran", "Naga", "Prathap",
    "Sakthi", "Thulasi", "Denzal", "Karthi", "Niranjan", "Praveen", "Raj", "Shesha", "Vijesh", "Yathish"
];

// 🔄 Load today's date and players on page load
window.onload = function () {
    document.getElementById("attendance-date").value = currentDate;
    loadDefaultPlayers();
    updateDashboard();
};

// 🔘 Get today's date in yyyy-mm-dd format
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
}

// 🔁 Triggered when date is changed from input
function changeDate() {
    currentDate = document.getElementById("attendance-date").value;
    loadAttendanceForDate();
}

// 🔄 Load default players (if not already saved)
function loadDefaultPlayers() {
    attendanceData[currentDate] = attendanceData[currentDate] || [];
    if (attendanceData[currentDate].length === 0) {
        defaultPlayers.forEach(name => {
            addPlayerRow(name, "Not Marked");
        });
    } else {
        loadAttendanceForDate();
    }
}

// 🧠 Load saved data for selected date
function loadAttendanceForDate() {
    clearTable();
    serial = 1;
    const records = attendanceData[currentDate] || [];
    records.forEach(player => {
        addPlayerRow(player.name, player.status);
    });
    updateDashboard();
}

// 🧹 Clear all rows from table
function clearTable() {
    document.getElementById("table-body").innerHTML = "";
}

// ➕ Add player using input field
function addPlayer() {
    const nameInput = document.getElementById("new-player");
    const name = nameInput.value.trim();
    if (name === "") {
        alert("Please enter a player name.");
        return;
    }

    addPlayerRow(name, "Not Marked");
    nameInput.value = "";
}

// 🧱 Create a new row with name & status
function addPlayerRow(name, status) {
    const table = document.getElementById("table-body");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${serial}</td>
        <td>${name}</td>
        <td>${status}</td>
        <td>
            <button class="present" onclick="markStatus(this, 'Present')">Present</button>
            <button class="absent" onclick="markStatus(this, 'Absent')">Absent</button>
            <button class="delete" onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    table.appendChild(row);
    saveToAttendanceData(name, status);
    serial++;
    updateDashboard();
}

// ✅ Mark status (present/absent)
function markStatus(button, status) {
    const row = button.parentElement.parentElement;
    const name = row.children[1].innerText;
    row.children[2].innerText = status;
    saveToAttendanceData(name, status);
    updateDashboard();
}

// 🗑️ Remove row & data
function deleteRow(button) {
    const row = button.parentElement.parentElement;
    const name = row.children[1].innerText;
    row.remove();
    removeFromAttendanceData(name);
    updateDashboard();
}

// 📦 Save player status in datewise object
function saveToAttendanceData(name, status) {
    attendanceData[currentDate] = attendanceData[currentDate] || [];
    const players = attendanceData[currentDate];

    const existing = players.find(p => p.name === name);
    if (existing) {
        existing.status = status;
    } else {
        players.push({ name, status });
    }
}

// ❌ Remove a player from the data
function removeFromAttendanceData(name) {
    attendanceData[currentDate] = attendanceData[currentDate].filter(p => p.name !== name);
}

// 📊 Toggle dashboard panel
function toggleDashboard() {
    const panel = document.getElementById("dashboard-panel");
    panel.style.display = (panel.style.display === "block") ? "none" : "block";
}

// 📈 Update dashboard stats
function updateDashboard() {
    const total = document.querySelectorAll("#table-body tr").length;
    const present = [...document.querySelectorAll("#table-body td:nth-child(3)")]
        .filter(td => td.innerText === "Present").length;
    const absent = [...document.querySelectorAll("#table-body td:nth-child(3)")]
        .filter(td => td.innerText === "Absent").length;

    document.getElementById("total-count").innerText = total;
    document.getElementById("present-count").innerText = present;
    document.getElementById("absent-count").innerText = absent;
}
