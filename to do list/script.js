document.addEventListener("DOMContentLoaded", function () {
    let addTaskBtn = document.getElementById("addTaskBtn");
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    loadTasks(); // Load saved tasks when the page loads
    
    if (taskDate && new Date(taskDate) < new Date()) {
        li.classList.add("overdue");
    }
    

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        let taskText = taskInput.value.trim();
        let taskDate = document.getElementById("taskDate").value;
        
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        let li = document.createElement("li");

        let taskSpan = document.createElement("span");
        taskSpan.textContent = taskText + (taskDate ? ` (Due: ${taskDate})` : "");
        taskSpan.addEventListener("click", function () {
            taskSpan.classList.toggle("completed");
            saveTasks(); // Save updated state
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            li.remove();
            saveTasks(); // Update localStorage after deletion
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        saveTasks(); // Save to localStorage
        taskInput.value = "";
    }

    function saveTasks() {
        let tasks = [];
        document.querySelectorAll("#taskList li").forEach((li) => {
            tasks.push({
                text: li.querySelector("span").textContent,
                completed: li.querySelector("span").classList.contains("completed"),
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach((task) => {
            let li = document.createElement("li");

            let taskSpan = document.createElement("span");
            taskSpan.textContent = task.text;
            if (task.completed) {
                taskSpan.classList.add("completed");
            }
            taskSpan.addEventListener("click", function () {
                taskSpan.classList.toggle("completed");
                saveTasks();
            });

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function () {
                li.classList.add("removing"); 
                setTimeout(() => {
                    li.remove();
                    saveTasks();
                }, 300);
            });

            li.appendChild(taskSpan);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
});

document.getElementById("showAll").addEventListener("click", function () {
    document.querySelectorAll("#taskList li").forEach(li => li.style.display = "flex");
});

document.getElementById("showCompleted").addEventListener("click", function () {
    document.querySelectorAll("#taskList li").forEach(li => {
        li.style.display = li.querySelector("span").classList.contains("completed") ? "flex" : "none";
    });
});

document.getElementById("showPending").addEventListener("click", function () {
    document.querySelectorAll("#taskList li").forEach(li => {
        li.style.display = li.querySelector("span").classList.contains("completed") ? "none" : "flex";
    });
});

