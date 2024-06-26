import { useEffect, useState } from "react"
import RecipeComponentPanel from "./RecipeComponentPanel"
import EventTemplateGenerator from "../utilities/generateEvent"
import consumedServices from "../services/consumed"
import RecipeSummary from "./RecipeSummary"

import { addRecipe } from "../reducers/recipeReducer"
import { useDispatch, useSelector } from 'react-redux';

const RecipeForm = () => {
    const recipes = useSelector(state => state.recipes.recipes)
    const [recipeComponents, setRecipeComponents] = useState([EventTemplateGenerator.getConsumableWithRecipeComponent({}, 1, 0, '')])
    const [recipeName, setRecipeName] = useState('')
    const [recipeNotes, setRecipeNotes] = useState('')
    const [createRecipeError, setCreateRecipeError] = useState()
    
    const dispatch = useDispatch()

    const submitRecipe = (event) => {
        event.preventDefault()
        
        for (let i = 0; i < recipeComponents.length; i++) {
            if (recipeComponents[i].id === null || !("id" in recipeComponents[i])) {
                setCreateRecipeError("Please remove empty steps and try again.")
                return
            }
        }
        setCreateRecipeError("")

        const data = {recipe_name: recipeName,
                      notes: recipeNotes,
                      recipeComponents: recipeComponents
        }

        consumedServices.postNewRecipe(data)
                        .then(resp => {
                            dispatch(addRecipe(data))
                        })
                        .catch(err => {
                            console.log(`err was ${err}`)
                        }) 
    }
    
    return (
        <div id="Recipe-Display">
            <form onSubmit={(e) => submitRecipe(e)}>
                <h3>Create New Recipe</h3>

                <div>
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
                    {createRecipeError !== "" ? <div>{createRecipeError}</div> : <></>}
                </div>
                    </form>
                <div>
                    <RecipeComponentPanel recipeComponents={recipeComponents}
                                        setRecipeComponents={setRecipeComponents}/>
                </div>



            <div>
                <RecipeSummary recipeComponents={recipeComponents}/>
            </div>
        </div>
    )
}

export default RecipeForm