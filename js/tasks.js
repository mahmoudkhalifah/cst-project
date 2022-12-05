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
    let taskInfoDiv = document.createElement("div");
    taskInfoDiv.style = "display: inline-block; width:80%;"

    let taskName = document.createElement("p");
    let category = document.createElement("p");
    let delBtn = document.createElement("input");

    delBtn.type = "button";
    delBtn.className = "btn deleteBtn";
    delBtn.style = "width: auto; position:relative; bottom:20px";
    delBtn.value = "delete";

    delBtn.onclick = deleteTask;

    if (i === undefined)
        i = dayTasks.length - 1;

    taskName.innerText = dayTasks[i][0];
    taskName.classList.add("taskName");

    category.innerText = dayTasks[i][1];
    category.classList.add("taskCategory");

    if (dayTasks[i][2]=="done") {
        taskDiv.style.opacity=0.5;
        taskInfoDiv.classList.add("done");
    }

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
}

function clearTasksNodes() {
    let dayTaskDiv = document.getElementById("dayTasksDiv");
    dayTaskDiv.innerHTML = "";
}


function deleteAllDayTasks() {
    var flag = confirm("are you sure you want to delete all tasks of chosen ?");
    if(flag) {    
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

var checkAudio = new Audio("audios/check.mp3");

function checkTask() {
    //animation
    //sounds
    let taskDiv = this;
    let doneTask=this.firstElementChild;
    var date = document.getElementById("dateInput").value;
    if (doneTask.className.indexOf('done')==-1)
    {
        // doneTask.style.textDecoration = 'line-through';
        tasks[date][taskDiv.id][2] = "done";
        this.style.opacity=0.5;
        checkAudio.play();
        var o = 1;
        var timer = setInterval(function() {
            o-=0.01;
            taskDiv.style.opacity = o;
            if(o<0.51) {
                clearInterval(timer);
            }
        },5);
    }
    else{
        // doneTask.style='text-decoration-line: none;';
        tasks[date][taskDiv.id][2] = "todo";
        var o = 0.5;
        var timer = setInterval(function() {
            o+=0.01;
            taskDiv.style.opacity = o;
            if(o>0.99) {
                clearInterval(timer);
            }
        },5);
    }
    console.log(tasks[date]);
    doneTask.classList.toggle('done');
    window.localStorage.setItem("taskList", JSON.stringify(tasks));
}

function deleteTask() {
    var taskDiv = this.parentElement;
    var id = taskDiv.id;
    var date = document.getElementById("dateInput").value;
    var o = taskDiv.style.opacity;
    var timer = setInterval(function() {
        o-=0.01;
        taskDiv.style.opacity = o;
        if(o<0) {
            clearInterval(timer);
            taskDiv.remove();
        }
    },10);
    tasks[date].splice(id,1);
    window.localStorage.setItem("taskList", JSON.stringify(tasks));
    event.stopPropagation();
    //retrieveTasks();
}