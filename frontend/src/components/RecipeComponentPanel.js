import { useState } from "react"
import RecipeComponentForm from "./RecipeComponentForm"




const RecipeComponentPanel = ({recipeComponents, setRecipeComponents}) => {
    const [recipeStep, setRecipeStep] = useState(1)
    
    const movePanel = (increment) => {
        setRecipeStep(step => {
            // this works but logic might not be clear
            // return Math.min(Math.max(1, step + increment), recipeComponents.length)
            const newStep = step + increment

            if (newStep < 1) {
                return 1
            }
            if (newStep > recipeComponents.length) {
                return recipeComponents.length
            }
            return newStep
        })
    }
    // give classname which defines horizontal layout of buttons etc
    return (
        <div>
            <button onClick={() => {movePanel(-1)}}>{"<"}</button>
                <div>
                    <RecipeComponentForm updateComponent={() => {console.log("need to update component")}}
                                         recipeStep={recipeStep}
                                         recipeComponents={recipeComponents}
                                         setRecipeComponents={setRecipeComponents}/>
                    <button type="submit" >Save</button>
                </div>
            <button onClick={() => {movePanel(1)}}>{">"}</button>
        </div>
    )
}


export default RecipeComponentPanel