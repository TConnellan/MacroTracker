import Select from 'react-select'
import { useState } from 'react'
import ConsumedForm from './ConsumedForm'
import ConsumableForm from './ConsumableForm'
import RecipeForm from './RecipeForm'
import DataValidation from '../utilities/dataValidation'

const DailyMacros = ({user, choice, createConsumable, createConsumed}) => {

    const emptyCons = {name:'',brand:'',size:0, units:'', carbs:0, fats:0, proteins:0}
    const emptyRecipe = {created_at: '', last_edited_at: '', notes: ''}
    const emptyRecipeComponent = {quantity: 0, step_no: 0, step_desc: ''}
    const emptyConsumedEvent = {user_id: user, recipe_id: null, quantity: '', carbs: 0, fats: 0, proteins: 0, consumed_at: new Date(), notes:''}
    const [cons, setCons] = useState({...emptyCons})
    const [Recipe, setRecipe] = useState([])
    const [consumedEvent, setConsumedEvent] = useState({...emptyConsumedEvent})

    const submitCustomConsumed = (e) => {
        console.log(consumedEvent)
        e.preventDefault()
        try {
            const validatedConsumedEvent = DataValidation.validateConsumed(consumedEvent)
            console.log("here")
            window.confirm("Add this event?")
            createConsumed(validatedConsumedEvent)
        } catch (e) {
            console.log(e)
            window.alert(e)
        }
        
    }

    const handleCons = (e) => {
        e.preventDefault()
        console.log(e);
        console.log(`name: ${e.target.name}`)
        console.log(`value: ${e.target.value}`)
        const newCons = {...cons, [e.target.name]: e.target.value}
        console.log(newCons)
        setCons(newCons)
    }
    
    const handleConsumed = (e) => {
        e.preventDefault()
        const newConsumedEvent = {...consumedEvent, [e.target.name] : e.target.value}
        console.log(newConsumedEvent)
        setConsumedEvent(newConsumedEvent)
    }

    const handleDate = (e) => {
        console.log(e);
        const newConsumedEvent = {...consumedEvent, "consumed_at" : e}
        console.log(newConsumedEvent)
        setConsumedEvent(newConsumedEvent)
    }

    const handleUnits = (e) => {
        
        console.log(e);
        const newCons = {...cons, units: e.value}
        console.log(newCons)
        setCons(newCons)
    }
    if (choice == 'consumable') {
        return (
            <div id="CreationForm">
                <ConsumableForm onSubmit={(e) => {
                    e.preventDefault(); 
                    if(window.confirm("Create this Consumable?")) {
                        createConsumable(cons); 
                        setCons({...emptyCons})
                    }}} 
                    cons={cons} 
                    onChange={handleCons} 
                    selectOnChange={handleUnits}/>
            </div>
        )
    } else if (choice == 'recipe') {
        return (
            <div id="CreationForm">
                <RecipeForm onsubmit={() => console.log("submitting recipe form")} />
            </div>
        )
    } else if (choice == 'add custom') {
        return (
            <div id="CreationForm">
                <ConsumedForm handleChange={handleConsumed} 
                              handleDate={handleDate}
                              consumed={consumedEvent} 
                              submitCustomConsumed={submitCustomConsumed}/>
            </div>
        )
    } else {
        return (
            <div>X {choice} X</div>
        )
    }
}



export default DailyMacros;