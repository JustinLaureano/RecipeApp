const createRecipeView = `
    <form>
        <input type="text" placeholder="Recipe Name" id="recipeName">

        <textarea rows="3" cols="50" placeholder="Summary" id="recipeSummary"></textarea>

        <label for="recipeCategory">Recipe Category</label>
        <select id="recipeCategory">
            <option selected>Appetizer</option>
            <option>Salads</option>
            <option>Bakery</option>
            <option>Seafood</option>
            <option>Beef</option>
            <option>Entrees</option>
            <option>Dessert</option>
        </select>

        <div id="enterIngredientField">
            <h2>Enter Ingedients</h2>

            <ul id="ingredientItems">
            </ul>

            <label for="recipeSummary">Amount</label>
            <input type="text" placeholder="2 oz" id="ingredientAmount">

            <label for="recipeSummary">Ingredient</label>
            <input type="text" placeholder="Asparagus" id="ingredientItem">

            <button type="button" id="addIngredient">Add Another Ingedient</button>

        </div>

        <div id="enterDirectionForm">
            <h2>Enter Directions</h2>

            <ol id="directionSteps">
            </ol>

            <label for="recipeSummary">Step</label>
            <input type="text" placeholder="Enter Next Step" id="directionStep">

            <button type="button" id="addDirection">Add Another Direction</button>

        </div>

        <button type="button" id="submitRecipeButton">Submit Recipe</button>
    </form>
`;

