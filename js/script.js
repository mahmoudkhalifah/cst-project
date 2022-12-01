
function init(){}

let categories = [];
// let categories = [{"newTaskCategory":"school", "color":"red"}];


document.getElementById("category").style.display = "none";

submitNewCategory = document.getElementById("submitNewCategoryBtn");
submitNewCategory.addEventListener("click",addNewCategory);
togCategoryBtn = document.getElementById("popUpBtn");
togCategoryBtn.addEventListener("click", toggleCategoryBtn);

function toggleCategoryBtn()
{
    if (togCategoryBtn.value == 'Add new category')
    {
        togCategoryBtn.value = 'close';
        showNewCategoryDiv();
    }
    else if (togCategoryBtn.value == 'close')
    {
        togCategoryBtn.value = 'Add new category';
        hideNewCategoryDiv();
    }
}

function showNewCategoryDiv()
{
    document.getElementById("category").style.display = "block";
}

function hideNewCategoryDiv()
{
    document.getElementById("category").style.display = "none";
    document.getElementById("newCategoryNameInput").value = "";
}

function addNewCategory()
{
    let cat_value = document.getElementById("newCategoryNameInput").value;
    let cat_color = document.getElementById("newCategoryColorInput").value;
    if (cat_value)
    {
        categories.push({"newTaskCategory": cat_value, "color": cat_color});
    
        updateCtegories();
        console.log(categories);
    }
    else
    {
        alert("You didn't enter the category name!")
    }
}

function updateCtegories()
{
    let categoriesListSelect = document.getElementById("newTaskCategorySelect");
    let option = document.createElement("option");
    option.text = categories[categories.length - 1]["newTaskCategory"];
    categoriesListSelect.append(option);
}

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
    // console.log(tasks["2022-12-01"]);
    console.log(tasks);
}

function addTaskNode() {

}

