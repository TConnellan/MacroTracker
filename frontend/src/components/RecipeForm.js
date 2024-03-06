import { useEffect, useState } from "react"
import RecipeComponentPanel from "./RecipeComponentPanel"
import EventTemplateGenerator from "../utilities/generateEvent"
import consumedServices from "../services/consumed"

const RecipeForm = ({user, token}) => {
    const [recipeComponents, setRecipeComponents] = useState([EventTemplateGenerator.getConsumableWithRecipeComponent({}, 1, 0, '')])
    const [recipeName, setRecipeName] = useState('')
    const [recipeNotes, setRecipeNotes] = useState('')
    // useEffect(() => {
    //     console.log(recipeComponents)
    // }, [recipeComponents])


    const submitRecipe = (event) => {
        event.preventDefault()
        
        // validate that None recipeComponents are not empty

        const data = {user: user,
                      recipe_name: recipeName,
                      notes: recipeNotes,
                      recipeComponents: recipeComponents
        }

        consumedServices.postNewRecipe(data, token)
                        .then(resp => {
                            console.log("check response here, resp was:")
                            console.log(resp)
                        })
                        .catch(err => {
                            console.log(`err was ${err}`)
                        }) 


    }
    
    return (
        <>
        <form onSubmit={(e) => submitRecipe(e)}>
            <h3>Add a Recipe</h3>

            <div>
                <div>Create a new recipe in this form</div>
                <div>
                    <label for="recipename">Recipe Name:</label>
                    <input id="recipename" 
                           name="recipename" 
                           defaultValue={recipeName} 
                           onChange={(event) => {event.preventDefault(); setRecipeName(event.target.value)}} />         
                </div>
                <div>
                    <label for="notes">Notes:</label>
                    <input id="notes" 
                           name="notes" 
                           defaultValue={recipeNotes} 
                           onChange={(event) => {event.preventDefault(); setRecipeNotes(event.target.value)}} />         
        
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