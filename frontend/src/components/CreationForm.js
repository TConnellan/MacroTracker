import CustomConsumedForm from './CustomConsumedForm'
import ConsumableForm from './ConsumableForm'
import RecipeForm from './RecipeForm'
import DataValidation from '../utilities/dataValidation'
import SearchForm from './SearchForm'
import SearchRecipes from './SearchRecipes'

const CreationForm = ({choice, createConsumable, createConsumed, newConsumedEvent, setNewConsumedEvent}) => {

    const submitCustomConsumed = (e) => {
        e.preventDefault()
        try {
            const validatedConsumedEvent = DataValidation.validateConsumed(newConsumedEvent)
            window.confirm("Add this event?")
            createConsumed(validatedConsumedEvent)
        } catch (e) {
            console.log(e)
            window.alert(e)
        }
        
    }

    const submitConsumedFromRecipe = (e) => {
        e.preventDefault()
        try {
            const validatedConsumedEvent = DataValidation.validateConsumed(newConsumedEvent)
            // console.log("here")
            window.confirm("Add this event?")
            createConsumed(validatedConsumedEvent)
        } catch (e) {
            console.log(e)
            window.alert(e)
        }
        
    }
    
    const handleConsumed = (e) => {
        e.preventDefault()
        const _newConsumedEvent = {...newConsumedEvent, [e.target.name] : e.target.value}
        console.log(_newConsumedEvent)
        setNewConsumedEvent(_newConsumedEvent)
    }

    const handleDate = (e) => {
        console.log(e);
        const _newConsumedEvent = {...newConsumedEvent, "consumed_at" : e}
        console.log(_newConsumedEvent)
        setNewConsumedEvent(_newConsumedEvent)
    }

    const loadConsumedFromRecipe = (newValues) => {
        setNewConsumedEvent(current => {
            return {...current, ...newValues}
        })
    }

    if (choice == 'consumable') {
        return (<></>)
    } else if (choice == 'add recipe') {
        return (
            <div id="CreationForm">
                <SearchRecipes submitConsumedFromRecipe={submitConsumedFromRecipe} 
                               consumed={newConsumedEvent}
                               submitCustomConsumed={submitCustomConsumed}
                               handleChange={handleConsumed} 
                               handleDate={handleDate}
                               loadConsumedFromRecipe={loadConsumedFromRecipe}/>
            </div>
        )
    } else if (choice == 'add custom') {
        return (
            <div id="CreationForm">
                <CustomConsumedForm handleChange={handleConsumed} 
                              handleDate={handleDate}
                              consumed={newConsumedEvent} 
                              submitCustomConsumed={submitCustomConsumed}/>
            </div>
        )
    } else {
        return (
            <div>X {choice} X</div>
        )
    }
}



export default CreationForm;