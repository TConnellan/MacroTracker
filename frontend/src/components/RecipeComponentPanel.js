import { useState } from "react"
import RecipeComponentForm from "./RecipeComponentForm"
import EventTemplateGenerator from "../utilities/generateEvent"



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

    const extendComponents = () => {
        setRecipeComponents(comps => {
            return [...comps, EventTemplateGenerator.getConsumableWithRecipeComponent({}, comps.length + 1, 0, '')]
        })
    }

    const updateComponent = (step_no, consumable, quantity = 1) => {
        // console.log(step_no)
        // console.log(consumable)
        setRecipeComponents(comps => {
                console.log("-----")
                console.log(consumable)
                const updated = comps.map(c => {
                    console.log(step_no)
                    console.log(c.step_no)
                    if (c.step_no == step_no) {
                        return EventTemplateGenerator.getConsumableWithRecipeComponent(consumable, step_no, quantity, '')
                    } else {
                        return c
                    }
                })
                console.log(updated)
                return updated
        })

        // console.log(recipeComponents)
    }

    // give classname which defines horizontal layout of buttons etc
    return (
        <div>
            <button onClick={(event) => {event.preventDefault(); movePanel(-1)}}>{"<"}</button>
            {recipeStep == recipeComponents.length ? <button onClick={(event) => {event.preventDefault(); extendComponents()}}>{"+"}</button> : <button onClick={(event) => {event.preventDefault(); movePanel(1)}}>{">"}</button>}
                <div>
                    <RecipeComponentForm updateComponent={updateComponent}
                                         recipeStep={recipeStep}
                                         recipeComponents={recipeComponents}
                                         setRecipeComponents={setRecipeComponents}/>
                    
                </div>
        </div>
    )
}
// <button type="submit" >Save</button>


export default RecipeComponentPanel