import { useState } from "react"
import RecipeComponentForm from "./RecipeComponentForm"
import EventTemplateGenerator from "../utilities/generateEvent"



const RecipeComponentPanel = ({recipeComponents, setRecipeComponents, token}) => {
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

    const extendComponents = () => {
        setRecipeComponents(comps => {
            return [...recipeComponents, EventTemplateGenerator.getEmptyRecipeComponent(comps.length + 1)]
        })
    }

    // give classname which defines horizontal layout of buttons etc
    return (
        <div>
            <button onClick={(event) => {event.preventDefault(); movePanel(-1)}}>{"<"}</button>
                <div>
                    <RecipeComponentForm token={token}
                                         updateComponent={() => {console.log("need to update component")}}
                                         recipeStep={recipeStep}
                                         recipeComponents={recipeComponents}
                                         setRecipeComponents={setRecipeComponents}/>
                    
                </div>
            {recipeStep == recipeComponents.length ? <button onClick={(event) => {event.preventDefault(); extendComponents()}}>{"+"}</button> : <button onClick={(event) => {event.preventDefault(); movePanel(1)}}>{">"}</button>}
        </div>
    )
}
// <button type="submit" >Save</button>


export default RecipeComponentPanel