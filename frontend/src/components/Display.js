
import MacroDisplay from "./MacroDisplay"
import RecipeDisplay from "./RecipeDisplay"
import PantryDisplay from "./PantryDisplay"

const Display = ({sidebarChoice, user, consumed, consumedDate, setConsumed, removeConsumedEntry, createConsumable, createConsumed}) => {

    switch (sidebarChoice) {
        case "Macros":
            return (
                <MacroDisplay user={user}
                            consumed={consumed} 
                            consumedDate={consumedDate} 
                            setConsumed={setConsumed} 
                            createConsumable={createConsumable}
                            removeConsumedEntry={removeConsumedEntry}
                            createConsumed={createConsumed}/>
                )
        case "Recipes":
            return (
                <RecipeDisplay user={user}
                            consumed={consumed} 
                            consumedDate={consumedDate} 
                            setConsumed={setConsumed} 
                            createConsumable={createConsumable}
                            removeConsumedEntry={removeConsumedEntry}
                            createConsumed={createConsumed}/>
                )
        case "Pantry":
            return (
                <PantryDisplay user={user}
                            consumed={consumed} 
                            consumedDate={consumedDate} 
                            setConsumed={setConsumed} 
                            createConsumable={createConsumable}
                            removeConsumedEntry={removeConsumedEntry}
                            createConsumed={createConsumed}/>
                )
        default:
            return <div>Undefined</div>
                
    } 
}


export default Display;