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

}
