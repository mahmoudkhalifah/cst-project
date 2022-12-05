var tasks = {};
/*
    tasks list structure
    {
        "22-12-2022": [
            ["clean my room","home","todo"],
            ["make lunch","food","done"],
            ["study math","school","todo"]
        ],
        "25-12-2022": [
            ["wash the dishes","home","todo"],
            ["make dinner","food","todo"],
        ]
    }
*/
function checkLocalStorage() {
    //Look for saved categories.
    if (window.localStorage.getItem("categories") !== null) {
        categories = JSON.parse(window.localStorage.getItem("categories"));
        categoriesLength = Object.keys(categories).length;

        for (let i = 0; i < categoriesLength; i++) {
            let categoryName = Object.keys(categories)[i];
            updateCategories(categoryName);
        }
    }

    //Look for saved tasks.
    if (window.localStorage.getItem("taskList") !== null) {
        tasks = JSON.parse(window.localStorage.getItem("taskList"))
        var date = document.getElementById("dateInput").value;
        let currentDateTask = tasks[date]?tasks[date]:[];

        for (let i = 0; i < currentDateTask.length; i++) {
            addTaskNode(i);
        }
    }
}



function addTask() {
    var date = document.getElementById("dateInput").value;
    var taskName = document.getElementById("newTaskNameInput").value;
    var taskCategorySelect = document.getElementById("newTaskCategorySelect");
    var selectedCategoryIndex = taskCategorySelect.selectedIndex;
    if (selectedCategoryIndex != -1) {
        var taskCategory = taskCategorySelect.children[selectedCategoryIndex].value;
        if (date && taskName) {
            if (tasks[date])
                tasks[date].push([taskName, taskCategory, "todo"]);
            else {
                tasks[date] = [];
                tasks[date].push([taskName, taskCategory, "todo"]);
            }
            document.getElementById("newTaskNameInput").value = "";
            addTaskNode();
        } else {
            alert("choose date and enter task name");
        }
    } else {
        alert("add category and choose it first");
    }

    //store data in local storage 
    window.localStorage.setItem("taskList", JSON.stringify(tasks));

    // console.log(tasks["2022-12-01"]);
    console.log(tasks);
}


function addTaskNode(i) {
    var date = document.getElementById("dateInput").value;
    let dayTaskDiv = document.getElementById("dayTasksDiv");
    let dayTasks = tasks[date];

    let taskDiv = document.createElement("div");
    let taskName = document.createElement("p");
    let category = document.createElement("p");

    if (i === undefined)
        i = dayTasks.length - 1;

    taskName.innerText = dayTasks[i][0];
    taskName.classList.add("taskName");

    category.innerText = dayTasks[i][1];
    category.classList.add("taskCategory");

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(category);
    //taskDiv.style.display = "";
    taskDiv.classList.add("task");
    taskDiv.style.borderLeft = "30px solid" + getColor(category.innerText);
    dayTaskDiv.appendChild(taskDiv);
}


function retrieveTasks() {
    document.getElementById("categoryFilterSelect").selectedIndex = 0;

    clearTasksNodes();

    var date = document.getElementById("dateInput").value;
    let dayTasks = tasks[date];

    if (dayTasks) {
        for (let i = 0; i < dayTasks.length; i++) {
            addTaskNode(i);
        }
    }
}

function clearTasksNodes() {
    let dayTaskDiv = document.getElementById("dayTasksDiv");
    dayTaskDiv.innerHTML = "";
}


function deleteAllDayTasks() {
    var date = document.getElementById("dateInput").value;
    tasks[date] = [];
    window.localStorage.setItem("taskList", JSON.stringify(tasks));
    retrieveTasks();
}

function deleteAllTasks() {
    tasks = {};
    window.localStorage.setItem("taskList", JSON.stringify({}));
}