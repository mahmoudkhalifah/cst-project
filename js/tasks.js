var tasks = [];
/*
    tasks list structure
    [
        "22-12-2022": [
            ["clean my room","home","todo"],
            ["make lunch","food","done"],
            ["study math","school","todo"]
        ],
        "25-12-2022": [
            ["wash the dishes","home","todo"],
            ["make dinner","food","todo"],
        ]
    ]
*/

function addTask () {
    var date = document.getElementById("dateInput").value;
    var taskName = document.getElementById("newTaskNameInput").value;
    var taskCategorySelect = document.getElementById("newTaskCategorySelect");
    var selectedCategoryIndex = taskCategorySelect.selectedIndex;
    if(selectedCategoryIndex !=-1) {
        var taskCategory = taskCategorySelect.children[selectedCategoryIndex].value;
        if(date && taskName) {
            if(tasks[date]) 
                tasks[date].push([taskName,taskCategory,"todo"]);
            else {
                tasks[date] = [];
                tasks[date].push([taskName,taskCategory,"todo"]);
            }
            document.getElementById("newTaskNameInput").value="";
            addTaskNode();
        } else {
            alert("choose date and enter task name");
        }
    } else {
        alert("add category and choose it first");
    }
    
    // console.log(tasks["2022-12-01"]);
    console.log(tasks);
}

function addTaskNode() {

    let dayTaskDiv = document.getElementById("dayTasksDiv");
    
}

function retrieveTasks(){
    var date = document.getElementById("dateInput").value;
    let dayTaskDiv = document.getElementById("dayTasksDiv");
    dayTaskDiv.innerHTML="";
    
    let daysTasks = tasks[date];
    if(daysTasks){
        for(let i=0; i<daysTasks.length;i++){
            
            let taskDiv = document.createElement("div");
            let taskName = document.createElement("h6");
            let category = document.createElement("p");
            taskName.innerText = daysTasks[i][0];
            category.innerText = daysTasks[i][1];

            taskDiv.appendChild(taskName);
            taskDiv.appendChild(category);
            taskDiv.style.backgroundColor = getColor(category.innerText);
            dayTaskDiv.appendChild(taskDiv);
        }
    }
}