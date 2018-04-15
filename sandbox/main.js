// for (let i = 0; i < recipes.length; i++) {
//     console.log(recipes[i].recipe.name);
// }

//Declarations
let createdRecipeName = document.getElementById('createdRecipeName');
let createdRecipeCategory = document.getElementById('createdRecipeCategory');
let createdRecipeSummary = document.getElementById('createdRecipeSummary');
let createdIngredientList = document.getElementById('ingredientList');
let createdDirectionList = document.getElementById('directionList');

displayRecipe = false;

//Create Current Recipe

let showPreview = () => {
    if (!displayRecipe) {
        document.getElementById('displayRecipe').style.display = 'initial';
    }

    createdRecipeName.appendChild(document.createTextNode('Name: ' + recipes[recipes.length-1].recipe.name));
    createdRecipeSummary.appendChild(document.createTextNode('Summary: ' + recipes[recipes.length-1].recipe.summary));
    createdRecipeSummary.appendChild(document.createTextNode('Category: ' + recipes[recipes.length-1].recipe.category));
    
    for (let i = 0; i < recipes[recipes.length-1].recipe.ingredients.length; i++) {
        let ingredient = document.createElement('li');
        let ingredientStr = recipes[recipes.length-1].recipe.ingredients[i].amount + ' ' + recipes[recipes.length-1].recipe.ingredients[i].item;
        ingredient.appendChild(document.createTextNode(ingredientStr));
        createdIngredientList.appendChild(ingredient);
    }
    
    for (let i = 0; i < recipes[recipes.length-1].recipe.directions.length; i++) {
        let direction = document.createElement('li');
        let directionStr = recipes[recipes.length-1].recipe.directions[i].step + ' ' + recipes[recipes.length-1].recipe.directions[i].step + '.';
        direction.appendChild(document.createTextNode(directionStr));
        createdDirectionList.appendChild(direction);
    }
};




//Form for Entering Recipes
let submitRecipeBtn = document.getElementById('submitRecipeButton');
let addIngredientBtn = document.getElementById('addIngredient');
let addDirectionBtn = document.getElementById('addDirection');
let ingredients = [];
let directions = [];

let clearIngredientInput = () => {
    document.getElementById('ingredientAmount').value = '';
    document.getElementById('ingredientItem').value = '';
}

let clearDirectionInput = () => {
    document.getElementById('directionStep').value = '';
}

let clearRecipeForm = () => {
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeSummary').value = '';
    // let recipeCategory = document.getElementById('recipeCategory').value;
    ingredients = [];
    directions = [];

    //Clear Ingredient List Items
    document.getElementById('ingredientItems').innerHTML = '';
    document.getElementById('directionSteps').innerHTML = '';
    //Clear Direction List Items
};

let addIngredient = () => {
    let ingredientAmount = document.getElementById('ingredientAmount').value;
    let ingredientItem = document.getElementById('ingredientItem').value;

    if (ingredientAmount !== '' && ingredientItem !== '') {
        let newIngredient = {
            amount: ingredientAmount,
            item: ingredientItem
        };

        let newLI = document.createElement('li');
        newLI.appendChild(document.createTextNode(ingredientAmount + ' ' + ingredientItem));
        document.getElementById('ingredientItems').appendChild(newLI);

        ingredients.push(newIngredient);
        clearIngredientInput();
    }
};

let addDirection = () => {
    let directionStep = document.getElementById('directionStep').value;

    if (directionStep !== '') {
        let newDirection = {
            step: directionStep
        };

        let newLI = document.createElement('li');
        newLI.appendChild(document.createTextNode(directionStep));
        document.getElementById('directionSteps').appendChild(newLI);

        directions.push(newDirection);
        clearDirectionInput();
    }
};

let validateForm = (recipeName, recipeSummary, recipeIngredients, recipeDirections) => {
    if (recipeName !== 0 &&
    recipeSummary !== 0 &&
    recipeIngredients.length !== 0 &&
    recipeDirections.length !== 0) {
        return true;
    }
    alert('please fill out all inputs.');
}

let saveRecipe = (recipeName, recipeSummary, recipeCategory, recipeIngredients, recipeDirections) => {
    let newRecipe = {
        recipe: {
            name: recipeName,
            summary: recipeSummary,
            category: recipeCategory,
            ingredients: recipeIngredients,
            directions: recipeDirections
        }
    }

    recipes.push(newRecipe);
}

let addRecipe = () => {
    let recipeName = document.getElementById('recipeName').value;
    let recipeSummary = document.getElementById('recipeSummary').value;
    let recipeCategory = document.getElementById('recipeCategory').value;
    let recipeIngredients = ingredients;
    let recipeDirections = directions;

    let isValid = validateForm(recipeName, recipeSummary, recipeIngredients, recipeDirections);

    if (isValid) {
        saveRecipe(recipeName, recipeSummary, recipeCategory, recipeIngredients, recipeDirections);
        clearRecipeForm();
        showPreview();
    }
    console.log(recipes);
};

submitRecipeBtn.addEventListener('click', addRecipe);
addIngredientBtn.addEventListener('click', addIngredient);
addDirectionBtn.addEventListener('click', addDirection);
