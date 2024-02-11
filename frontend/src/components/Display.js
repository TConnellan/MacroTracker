
import MacroDisplay from "./MacroDisplay"
import RecipeDisplay from "./RecipeDisplay"
import PantryDisplay from "./PantryDisplay"
import consumedServices from '../services/consumed'

const Display = ({sidebarChoice, user, consumed, consumedDate, setConsumed, removeConsumedEntry, createConsumable, createConsumed}) => {
    // const [newConsumedEvent, setNewConsumedEvent] = useState(consumedEventGenerator.getEmptyConsumedEvent(user, new Date()))
    // const [selectedStartDate, setSelectedStartDate] = useState('')
    // const [selectedEndDate, setSelectedEndDate] = useState(null)

    // useEffect(() => {
    //     const today = new Date()
    //     today.setHours(0, 0, 0)
    //     setSelectedStartDate(today)
    // }, [])

    // const createDateHeaderValue = (startDate, endDate) => {
    //     return startDate.toString().slice(0, 24) + `${endDate ? " - " + endDate.toString().slice(0,24) : ""}`
    // }

    switch (sidebarChoice) {
        case "Macros":
            return (
                <MacroDisplay user={user} 
                            consumed={consumed} 
                            consumedDate={consumedDate} 
                            setConsumed={setConsumed} 
                            createConsumable={consumedServices.postNewConsumable}
                            removeConsumedEntry={removeConsumedEntry}
                            createConsumed={createConsumed}/>
                )
        case "Recipes":
            return (
                <RecipeDisplay user={user} 
                            consumed={consumed} 
                            consumedDate={consumedDate} 
                            setConsumed={setConsumed} 
                            createConsumable={consumedServices.postNewConsumable}
                            removeConsumedEntry={removeConsumedEntry}
                            createConsumed={createConsumed}/>
                )
        case "Pantry":
            return (
                <PantryDisplay user={user} 
                            consumed={consumed} 
                            consumedDate={consumedDate} 
                            setConsumed={setConsumed} 
                            createConsumable={consumedServices.postNewConsumable}
                            removeConsumedEntry={removeConsumedEntry}
                            createConsumed={createConsumed}/>
                )
                
    } 
}


export default Display;