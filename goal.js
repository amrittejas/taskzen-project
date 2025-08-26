window.onload = function() {
    const user = localStorage.getItem("username");
    if (!user) { window.location.href = "login.html"; }

    const goalsList = document.getElementById("goalsList");
    const saveGoalsBtn = document.getElementById("saveGoalsBtn");

    let goals = JSON.parse(localStorage.getItem(user + "_goals")) || ["", "", ""];
    document.querySelectorAll(".goal-input").forEach((input, idx) => {
        input.value = goals[idx];
    });

    saveGoalsBtn.addEventListener("click", () => {
        goals = [];
        document.querySelectorAll(".goal-input").forEach(input => goals.push(input.value));
        localStorage.setItem(user + "_goals", JSON.stringify(goals));
        alert("Goals saved!");
    });
};
