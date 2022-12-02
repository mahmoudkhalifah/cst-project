
let categories = {};
let submitNewCategory;
let togCategoryBtn;
// let categories = [{"newTaskCategory":"school", "color":"red"}];

function initCategories(){
    console.log("init");
    document.getElementById("category").style.display = "none";
    
    submitNewCategory = document.getElementById("submitNewCategoryBtn");
    submitNewCategory.addEventListener("click",addNewCategory);
    togCategoryBtn = document.getElementById("popUpBtn");
    togCategoryBtn.addEventListener("click", toggleCategoryBtn);

    // initialize selected option
    let searchCategories = document.getElementById("categoryFilterSelect");

    let option = document.createElement("option");
    option.value = "none";
    option.text = "No filter";
    option.selected = true;

    searchCategories.appendChild(option.cloneNode(true));

    selectFilter = document.getElementById("categoryFilterSelect");
    selectFilter.addEventListener("change", filterCategories);
}


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
        categories[cat_value] = cat_color;
    
        updateCtegories(cat_value);
        hideNewCategoryDiv();
        toggleCategoryBtn();
        console.log(categories);
    }
    else
    {
        alert("You didn't enter the category name!")
    }

        //store data in local storage 
        window.localStorage.setItem("categories",  JSON.stringify(categories));

}

function updateCtegories(category)
{
    let searchCategories = document.getElementById("categoryFilterSelect");
    let categoriesListSelect = document.getElementById("newTaskCategorySelect");

    let option = document.createElement("option");
    option.value = category;
    option.text = category;

    searchCategories.appendChild(option.cloneNode(true));
    categoriesListSelect.appendChild(option.cloneNode(true));

}

function getColor(cat){
    return categories[cat];
}


function filterCategories()
{
    var date = document.getElementById("dateInput").value;
    let dayTaskDiv = document.getElementById("dayTasksDiv");
    dayTaskDiv.innerHTML="";

    var selectedCategory = document.getElementById("categoryFilterSelect");
    var cat = selectedCategory.options[selectedCategory.selectedIndex].text;

    console.log(cat);
    
    let daysTasks = tasks[date];

    if(daysTasks && cat == "No filter"){
        for(let i=0; i<daysTasks.length;i++){ 
            addTaskNode(i);
        }
    }
    else if (daysTasks && cat != "No filter")
    {
        for (let i=0; i<daysTasks.length; i++)
        {
            if (daysTasks[i][1] == cat)
            {
                addTaskNode(i);
            }
        }
    }
}
