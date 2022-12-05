function init() {


    document.getElementById("addTaskBtn").onclick = addTask;
    document.getElementById("deleteEverything").onclick = deleteEverything;
    document.getElementById("deleteDayTasks").onclick = deleteAllDayTasks;
    //set default date as today's date
    document.getElementById("dateInput").valueAsDate = new Date();
    document.getElementById("dateInput").onchange = retrieveTasks;
    initCategories();
    checkLocalStorage();
}

function deleteEverything () {
    var flag = confirm("are you sure you want to delete all tasks and categories ?");
    if (flag) {
        deleteAllCategories();
        deleteAllTasks();
        window.location.reload();
    }
}