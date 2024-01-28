
const RecipeForm = () => {
    return (
        <form onSubmit={() => {console.log("add recipe")}}>
            <h3>Add a Recipe</h3>

            <div>
                <div>Create a new recipe in this form</div>
                <div>
                    <label for="recipename">Recipe Name:</label>
                    <input id="recipename" 
                           name="recipename" 
                           defaultValue={"needs State"} 
                           onChange={() => {console.log("needs update state")}} />
                </div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default RecipeForm