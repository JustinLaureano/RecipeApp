// Initialize Firebase
var config = {
    apiKey: configKeys.apiKey,
    authDomain: configKeys.authDomain,
    databaseURL: configKeys.databaseURL,
    projectId: configKeys.projectId,
    storageBucket: configKeys.storageBucket,
    messagingSenderId: configKeys.messagingSenderId
};
firebase.initializeApp(config);
var db = firebase.firestore();

//Google Auth
loggedIn = false;

const googleLoginButton = document.getElementById('googleLogin');
googleLoginButton.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    if (loggedIn) {
        firebase.auth().signOut()
        .then(() => {
            document.getElementById('container').innerHTML = 'Please log in';
            googleLoginButton.innerHTML = 'Login';
            loggedIn = false;
        }).catch((error) => {
        // An error happened.
        });
    } 
    else {
        firebase.auth().signInWithPopup(provider)
        .then(userLoggedIn)
    }
});

//Create Recipe
const setCreateRecipe = (user) => {
    document.getElementById('container').innerHTML = createRecipeView;
    const submitNewRecipeBtn = document.getElementById('submitRecipeButton');
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

    let saveRecipe = (user, recipeName, recipeSummary, recipeCategory, recipeIngredients, recipeDirections) => {
        let newRecipe = {
            recipe: {
                name: recipeName,
                summary: recipeSummary,
                category: recipeCategory,
                ingredients: recipeIngredients,
                directions: recipeDirections
            }
        }
    
        db.collection('users').doc(user.displayName).collection('recipes').doc(recipeName).set(newRecipe)
        .then(() => {
            console.log('Item added successfully!')
        })
        .catch((error) => {
            console.log('There was an error: ' + error)
        });
    }

    let addRecipe = (user) => {
        let recipeName = document.getElementById('recipeName').value;
        let recipeSummary = document.getElementById('recipeSummary').value;
        let recipeCategory = document.getElementById('recipeCategory').value;
        let recipeIngredients = ingredients;
        let recipeDirections = directions;
    
        let isValid = validateForm(recipeName, recipeSummary, recipeIngredients, recipeDirections);
    
        if (isValid) {
            saveRecipe(user, recipeName, recipeSummary, recipeCategory, recipeIngredients, recipeDirections);
            clearRecipeForm();
            setViewRecipe(user, recipeName);
        }
    };

    addIngredientBtn.addEventListener('click', addIngredient);
    addDirectionBtn.addEventListener('click', addDirection);
    submitNewRecipeBtn.addEventListener('click', () => {
        addRecipe(user);
    });
};

//View User Recipes
const setViewRecipes = (user) => {
    document.getElementById('container').innerHTML = viewRecipesView;
    let userRecipes = document.getElementById('userRecipes');


    db.collection('users').doc(user.displayName).collection('recipes').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data(), doc.data().recipe.name)

                let recipeName = document.createElement('li');
                recipeName.addEventListener('click', (e) => {
                    setViewRecipe(user, e.target.innerHTML);
                });
                recipeName.appendChild(document.createTextNode(doc.data().recipe.name));
                userRecipes.appendChild(recipeName);
            });
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
};

//View Single Recipe
const setViewRecipe = (user, recipeName) => {
    console.log(recipeName);
    document.getElementById('container').innerHTML = viewRecipeView;
    let createdRecipeName = document.getElementById('createdRecipeName');
    let createdRecipeCategory = document.getElementById('createdRecipeCategory');
    let createdRecipeSummary = document.getElementById('createdRecipeSummary');
    let createdIngredientList = document.getElementById('ingredientList');
    let createdDirectionList = document.getElementById('directionList');

    const currentRecipe = db.collection('users').doc(user.displayName).collection('recipes').doc(recipeName);

    currentRecipe.get()
        .then((doc) => {
            createdRecipeName.appendChild(document.createTextNode('Name: ' + doc.data().recipe.name));
            createdRecipeSummary.appendChild(document.createTextNode('Summary: ' + doc.data().recipe.summary));
            createdRecipeCategory.appendChild(document.createTextNode('Category: ' + doc.data().recipe.category));

            for (let i = 0; i < doc.data().recipe.ingredients.length; i++) {
                let ingredient = document.createElement('li');
                let ingredientStr = doc.data().recipe.ingredients[i].amount + ' ' + doc.data().recipe.ingredients[i].item;
                ingredient.appendChild(document.createTextNode(ingredientStr));
                createdIngredientList.appendChild(ingredient);
            }
            
            for (let i = 0; i < doc.data().recipe.directions.length; i++) {
                let direction = document.createElement('li');
                let directionStr = doc.data().recipe.directions[i].step + '.';
                direction.appendChild(document.createTextNode(directionStr));
                createdDirectionList.appendChild(direction);
            }
        })
        .catch((error) => {
            console.log("This recipe doesn't exist.", error);
        });
    
    const backtoCreateRecipeViewBtn = document.getElementById('backtoCreateRecipeView');
    backtoCreateRecipeViewBtn.addEventListener('click', () => {
        setCreateRecipe(user);
    });

    const backtoRecipesViewBtn = document.getElementById('backtoRecipesView');
    backtoRecipesViewBtn.addEventListener('click', () => {
        setViewRecipes(user);
    });
};

const setHomeView = (user) => {
    document.getElementById('container').innerHTML = Home;

    const createRecipeViewBtn = document.getElementById('createRecipeView');
    createRecipeViewBtn.addEventListener('click', () => {
        setCreateRecipe(user);
    });

    const viewRecipesViewBtn = document.getElementById('viewRecipesView');
    viewRecipesViewBtn.addEventListener('click', () => {
        setViewRecipes(user);
    });
};

const userLoggedIn = (result) => {
    const user = result.user;
    googleLoginButton.innerHTML = 'Logout';
    loggedIn = true;
    setHomeView(user);
    console.log('signed in as: ' + user.displayName);
}