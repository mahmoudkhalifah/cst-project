function init() {


    document.getElementById("addTaskBtn").onclick = addTask;
    //set default date as today's date
    document.getElementById("dateInput").valueAsDate = new Date();
    
    document.getElementById("dateInput").onchange = retrieveTasks;

    initCategories();
    checkLocalStorage();
}