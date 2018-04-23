const AddRecipePage = `
    <div>
        <div class="content">
            <h3>Add Recipe</h3>

            <fieldset>
                <div>
                    <label for="recipeCategory">Category</label>
                    <select id="recipeCategory">
                        <option>Appetizer</option>
                        <option>Salads</option>
                        <option>Entrees</option>
                        <option>Dessert</option>
                    </select>
                </div>
                <input type="text" placeholder="Recipe Name">
                <textarea id="recipeSummary" 
                    placeholder="Recipe Description (Optional)" 
                    rows="3" cols="50"
                >
            </fieldset>

            <fieldset>
                <legend>Add Ingredients</legend>
                <input id="ingredientAmount" placeholder="Amount">
                <input id="ingredientItem" placeholder="Ingredient">
                <button type="button" id="addIngredient">
                    <img src="https://fillmurray.com/18/18">
                    Add Ingredient
                </button>
            </fieldset>

            <section>
                <div id="ingredientItem">
                    <p id="ingredientAmount">2 oz</p>
                    <div>
                        <p id="ingredient">Asparagus</p>
                        <img src="fillmurray,com/18/18">
                    </div>
                </div>
            </section>

            <fieldset>
                <legend>Add Procedures</legend>
                <textarea id="procedureText" placeholder="Next Procedure">
                <button type="button" id="addProcedure">
                    <img src="https://fillmurray.com/18/18">
                    Add Procedure
                </button>
            </fieldset>

            <section id="procedureItems">
                <div id="procedureItem">
                    <p>Grill and Serve while hot.</p>
                    <div>
                        <img src="fillmurray,com/18/18">
                    </div>
                </div>
            </section>

            <section>
                <button type="button" id="clearRecipeFields">Clear Recipe</button>
                <button type="button" id="submitRecipeButton">Add Recipe</button>
            </section>
        </div>
    </div>
`;