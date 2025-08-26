window.onload = function() {
    const user = localStorage.getItem("username");
    if (!user) { window.location.href = "login.html"; }

    const journalInput = document.getElementById("journalInput");
    const saveJournalBtn = document.getElementById("saveJournalBtn");

    journalInput.value = localStorage.getItem(user + "_journal") || "";

    saveJournalBtn.addEventListener("click", () => {
        localStorage.setItem(user + "_journal", journalInput.value);
        alert("Journal saved!");
    });
};
