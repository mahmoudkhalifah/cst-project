var tasks = [];
/*
    tasks list structure
    [
        "22-12-2022": [
            ["clean my room","home"],
            ["make lunch","food"],
            ["study math","school"]
        ],
        "25-12-2022": [
            ["wash the dishes","home"],
            ["make dinner","food"],
        ]
    ]
*/

function init() {
    document.getElementById("addTaskBtn").onclick = addTask;
    //set default date as today's date
    document.getElementById("dateInput").valueAsDate = new Date();
}


function addTask () {
    var date = document.getElementById("dateInput").value;
    var taskName = document.getElementById("newTaskNameInput").value;
    var taskCategoryIndex = document.getElementById("newTaskCategorySelect").selectedIndex;
    var taskCategory = document.getElementsByName("newTaskCategory")[taskCategoryIndex].value;
    if(date && taskName) {
        if(tasks[date]) 
            tasks[date].push([taskName,taskCategory]);
        else {
            tasks[date] = [];
            tasks[date].push([taskName,taskCategory]);
        }
        document.getElementById("newTaskNameInput").value="";
        addTaskNode();
    } else {
        alert("choose date and enter task name");
    }
    console.log(tasks["2022-12-01"]);
}

function addTaskNode() {

}