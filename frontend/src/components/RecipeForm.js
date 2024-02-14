import { useState } from "react"
import RecipeComponentPanel from "./RecipeComponentPanel"
import EventTemplateGenerator from "../utilities/generateEvent"

const RecipeForm = ({token}) => {
    const [recipeComponents, setRecipeComponents] = useState([EventTemplateGenerator.getEmptyRecipeComponent()])
    return (
        <>
        <form onSubmit={(e) => {e.preventDefault() ;console.log("add recipe")}}>
            <h3>Add a Recipe</h3>

            <div>
                <div>Create a new recipe in this form</div>
                <div>
                    <label for="recipename">Recipe Name:</label>
                    <input id="recipename" 
                           name="recipename" 
                           defaultValue={"recipe name needs State"} 
                           onChange={() => {console.log("recipe name needs update state")}} />         
                </div>
                <div>
                    <label for="notes">Recipe Name:</label>
                    <input id="notes" 
                           name="notes" 
                           defaultValue={"notes needs State"} 
                           onChange={() => {console.log("notes needs update state")}} />         
        
                </div>
                <button type="submit">Create Recipe</button>
            </div>
                </form>
            <div>
                <RecipeComponentPanel token={token}
                                      recipeComponents={recipeComponents}
                                      setRecipeComponents={setRecipeComponents}/>
            </div>
        </>
    )
}

export default RecipeForm