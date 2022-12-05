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
        let currentDateTask = tasks[date] ? tasks[date] : [];

        for (let i = 0; i < currentDateTask.length; i++) {
            addTaskNode(i);
        }
        updateProgressBar(date);
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
    updateProgressBar(date);
    // console.log(tasks["2022-12-01"]);
    // console.log(tasks);
}


function addTaskNode(i) {
    var date = document.getElementById("dateInput").value;
    let dayTaskDiv = document.getElementById("dayTasksDiv");
    let dayTasks = tasks[date];

    let taskDiv = document.createElement("div");
    let taskInfoDiv = document.createElement("div");
    taskInfoDiv.style = "display: inline-block; width:80%;"

    let taskName = document.createElement("p");
    let category = document.createElement("p");
    let delBtn = document.createElement("input");

    delBtn.type = "image";
    delBtn.className = "btn deleteBtn";
    //delBtn.style = "width: auto; position:relative; bottom:20px;";
    delBtn.style = "height: 20px; width:20px; position:relative; top:5px;";
    delBtn.src = "images/trash-can.png";

    delBtn.onclick = deleteTask;

    if (i === undefined)
        i = dayTasks.length - 1;

    taskName.innerText = dayTasks[i][0];
    taskName.classList.add("taskName");

    category.innerText = dayTasks[i][1];
    category.classList.add("taskCategory");

    if (dayTasks[i][2] == "done") {
        taskDiv.style.opacity = 0.5;
        taskInfoDiv.classList.add("done");
    }

    taskName.style = "position:relative; bottom:12px;";
    category.style = "position:relative; bottom:5px;";

    taskDiv.onclick = checkTask;

    taskInfoDiv.appendChild(taskName);
    taskInfoDiv.appendChild(category);
    taskDiv.append(taskInfoDiv);
    taskDiv.appendChild(delBtn);
    taskDiv.classList.add("task");
    taskDiv.style.borderLeft = "30px solid" + getColor(category.innerText);
    taskDiv.id = i;
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
    updateProgressBar(date);
}

function clearTasksNodes() {
    let dayTaskDiv = document.getElementById("dayTasksDiv");
    dayTaskDiv.innerHTML = "";
}


function deleteAllDayTasks() {
    var flag = confirm("are you sure you want to delete all tasks of chosen ?");
    if (flag) {
        var date = document.getElementById("dateInput").value;
        tasks[date] = [];
        window.localStorage.setItem("taskList", JSON.stringify(tasks));
        retrieveTasks();
    }
}

function deleteAllTasks() {
    tasks = {};
    window.localStorage.setItem("taskList", JSON.stringify({}));
}


function checkTask() {
    //animation
    //sounds
    var checkAudio = new Audio("audios/check.mp3");
    let taskDiv = this;
    let doneTask = this.firstElementChild;
    var date = document.getElementById("dateInput").value;
    if (doneTask.className.indexOf('done') == -1) {
        tasks[date][taskDiv.id][2] = "done";
        this.style.opacity = 0.5;
        if (calculateProgress(date)==100) {
            goodJobPlay();
        } else {
            checkAudio.play();
        }
        var o = 1;
        var timer = setInterval(function () {
            o -= 0.01;
            taskDiv.style.opacity = o;
            if (o < 0.51) {
                clearInterval(timer);
            }
        }, 5);
    }
    else {
        tasks[date][taskDiv.id][2] = "todo";
        var o = 0.5;
        var timer = setInterval(function () {
            o += 0.01;
            taskDiv.style.opacity = o;
            if (o > 0.99) {
                clearInterval(timer);
            }
        }, 5);
    }
    //console.log(tasks[date]);
    doneTask.classList.toggle('done');
    updateProgressBar(date);
    
    window.localStorage.setItem("taskList", JSON.stringify(tasks));
}

function deleteTask() {
    var taskDiv = this.parentElement;
    var id = taskDiv.id;
    var date = document.getElementById("dateInput").value;
    var o = taskDiv.style.opacity;
    var timer = setInterval(function () {
        o -= 0.01;
        taskDiv.style.opacity = o;
        if (o < 0) {
            clearInterval(timer);
        }
    }, 10);
    var status = tasks[date][id][2]!='done';
    tasks[date].splice(id, 1);
    if (calculateProgress(date)==100 && status) {
        goodJobPlay();
    }
    window.localStorage.setItem("taskList", JSON.stringify(tasks));
    retrieveTasks();

    event.stopPropagation();
}

function calculateProgress(date) {
    var numOfTasks = tasks[date].length;
    var numOfDoneTasks = 0;
    for (var i = 0; i < numOfTasks; i++) {
        if (tasks[date][i][2] == "done") {
            numOfDoneTasks += 1;
        }
    }
    return (numOfDoneTasks / numOfTasks) * 100;
}

function updateProgressBar(date) {
    if (tasks[date] && tasks[date].length != 0) {
        var progress = calculateProgress(date);
        console.log("progress: " + progress);
        var w = parseInt(document.getElementById("progressBar").style.width) || 0;
        var timer;
        if (progress < w) {
            timer = setInterval(function () {
                if (w > 1) {
                    w -= 1;
                    //console.log("w" + w);
                    document.getElementById("progressBar").style.width = w + "%";
                }
                if (w <= progress) {
                    clearInterval(timer);
                }
            }, 10);
        } else if(progress > w) {
            timer = setInterval(function () {
                w += 1;
                //console.log("w" + w);
                document.getElementById("progressBar").style.width = w + "%";
                if (w > progress - 1) {
                    clearInterval(timer);
                }
            }, 10);
        }
    } else {
        document.getElementById("progressBar").style.width = "1%";
    }
}

function goodJobPlay () {
    var goodJobAudio = new Audio("audios/Good Job.mp3");
    goodJobAudio.play();
}