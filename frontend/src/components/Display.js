
import MacroDisplay from "./MacroDisplay"
import RecipeDisplay from "./RecipeDisplay"
import PantryDisplay from "./PantryDisplay"

const Display = ({sidebarChoice, removeConsumedEntry, createConsumable, createConsumed}) => {

    switch (sidebarChoice) {
        case "Macros":
            return (
                <MacroDisplay createConsumable={createConsumable}
                            removeConsumedEntry={removeConsumedEntry}
                            createConsumed={createConsumed}/>
                )
        case "Recipes":
            return (
                <RecipeDisplay />
                )
        case "Pantry":
            return (
                <PantryDisplay />
                )
        default:
            return <div>Undefined</div>
                
    } 
}


export default Display;