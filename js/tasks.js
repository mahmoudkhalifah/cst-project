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
function checkLocalStorage(){
   //Look for saved categories.
   if(window.localStorage.getItem("categories") !== null){
        categories = JSON.parse(window.localStorage.getItem("categories"));
        categoriesLength =  Object.keys(categories).length;

        for(let i=0; i < categoriesLength; i++ ){
            let categoryName = Object.keys(categories)[i];
            updateCtegories(categoryName);
        }
   }

   //Look for saved tasks.
   if (window.localStorage.getItem("taskList") !== null ){
    tasks = JSON.parse(window.localStorage.getItem("taskList") )
    var date = document.getElementById("dateInput").value;
    let currentDateTask = tasks[date];
        
        for(let i=0; i<currentDateTask.length; i++ ){
            addTaskNode(i);
        }
    }
}



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
    
    //store data in local storage 
    window.localStorage.setItem("taskList",  JSON.stringify(tasks));

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

    if (i===undefined)
        i=dayTasks.length-1;

    taskName.innerText = dayTasks[i][0];
    taskName.style.fontWeight = "bold";
    taskName.style.fontSize  = "20px";
    taskName.style.textAlign = "center";
    taskName.style.paddingTop = "16px";
    taskName.style.lineHeight = "0.2";
    
    category.innerText = dayTasks[i][1];
    category.style.textAlign = "center";
    category.style.fontSize  = "14px";
    category.style.paddingBottom = "16px";
    category.style.color="#808080";
    category.style.lineHeight = "0.2";
    
    taskDiv.appendChild(taskName);
    taskDiv.appendChild(category);
    //taskDiv.style.display = "";
    taskDiv.style.borderRadius = "10px";
    taskDiv.style.backgroundColor = "#F8F8F8";
    taskDiv.style.borderLeft = "30px solid"+ getColor(category.innerText);
    dayTaskDiv.appendChild(taskDiv);
}


function retrieveTasks(){
    document.getElementById("categoryFilterSelect").selectedIndex = 0;

    clearTasks();
    
    var date = document.getElementById("dateInput").value;
    let dayTasks = tasks[date];

    if(dayTasks){
        for(let i=0; i<dayTasks.length;i++){
            addTaskNode(i);
        }
    }
}

function clearTasks(){
    let dayTaskDiv = document.getElementById("dayTasksDiv");
    dayTaskDiv.innerHTML="";
}