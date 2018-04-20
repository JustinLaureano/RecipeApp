const AddRecipePage = `
    <div>
        <div class="content">
            <h3>Add Recipe</h3>

            <fieldset>
                <div>
                    <label>Category</label>
                    <select>
                        <option>Appetizer</option>
                        <option>Salads</option>
                        <option>Entrees</option>
                        <option>Dessert</option>
                    </select>
                </div>
                <input type="text" placeholder="Recipe Name">
                <textarea placeholder="Recipe Description (Optional)" rows="3" cols="50">
            </fieldset>

            <fieldset>
                <legend>Add Ingredients</legend>
                <input placeholder="Amount">
                <input placeholder="Ingredient">
                <button>
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
                <textarea placeholder="Next Procedure">
                <button>
                    <img src="https://fillmurray.com/18/18">
                    Add Procedure
                </button>
            </fieldset>

            <section>
                <div id="ProcedureItem">
                    <p id="procedure">Grill and Serve</p>
                    <div>
                        <img src="fillmurray,com/18/18">
                    </div>
                </div>
            </section>

            <section>
                <button>Clear Recipe</button>
                <button>Add Recipe</button>
            </section>
        </div>
    </div>
`;