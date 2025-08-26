window.onload = function () {
    const user = localStorage.getItem("username");
    if (!user) {
        window.location.href = "login.html"; // redirect if not logged in
    }
    document.getElementById("userIdDisplay").textContent = user;

    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    

    // Load saved tasks for this user
    let tasks = JSON.parse(localStorage.getItem(user + "_tasks")) || [];

    function saveTasks() {
        localStorage.setItem(user + "_tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "flex items-center justify-between bg-gray-50 p-3 rounded-xl todo-item fade-in";

            const span = document.createElement("span");
            span.textContent = task.text;
            span.style.color = task.priority === "High" ? "red" : task.priority === "Medium" ? "orange" : "green";

            span.className = task.completed ? "completed-text" : "";
            span.addEventListener("click", () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });
            const checkBtn = document.createElement("button");
        checkBtn.textContent = "✔";
        checkBtn.className = "ml-2 text-green-600 hover:text-green-800";
        checkBtn.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();

            function updateProgress() {
                const completed = tasks.filter(t => t.completed).length;
                const total = tasks.length;
                const percent = total === 0 ? 0 : (completed / total) * 100;
                document.getElementById("progressBar").style.width = percent + "%";
            }
            
            // Call updateProgress at the end of renderTasks
            updateProgress();
            
        });

            const delBtn = document.createElement("button");
            delBtn.textContent = "❌";
            delBtn.className = "ml-4 text-red-500 hover:text-red-700";
            delBtn.addEventListener("click", () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(span);
           

            li.appendChild(checkBtn);
            li.appendChild(delBtn);
            taskList.appendChild(li);
        });
    }

    addTaskButton.addEventListener("click", () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ 
                text, 
                completed: false, 
                priority: document.getElementById("taskPriority").value 
            });
            
            saveTasks();
            renderTasks();
            taskInput.value = "";
        }
    });

    renderTasks();
};

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "login.html";
}
