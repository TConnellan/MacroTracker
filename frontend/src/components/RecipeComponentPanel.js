import { useState } from "react"
import RecipeComponentForm from "./RecipeComponentForm"
import EventTemplateGenerator from "../utilities/generateEvent"



const RecipeComponentPanel = ({recipeComponents, setRecipeComponents}) => {
    const [recipeStep, setRecipeStep] = useState(1)

    const movePanel = (increment) => {
        setRecipeStep(step => {
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
        setRecipeComponents(comps => {
                const updated = comps.map(c => {
                    if (c.step_no == step_no) {
                        return EventTemplateGenerator.getConsumableWithRecipeComponent(consumable, step_no, quantity, '')
                    } else {
                        return c
                    }
                })
                return updated
        })
    }

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

export default RecipeComponentPanel