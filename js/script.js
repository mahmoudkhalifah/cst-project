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
