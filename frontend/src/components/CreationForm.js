import ConsumedForm from './ConsumedForm'
import ConsumableForm from './ConsumableForm'
import RecipeForm from './RecipeForm'
import DataValidation from '../utilities/dataValidation'

const CreationForm = ({user, choice, createConsumable, createConsumed, newConsumedEvent, setNewConsumedEvent}) => {

    const submitCustomConsumed = (e) => {
        console.log(newConsumedEvent)
        e.preventDefault()
        try {
            const validatedConsumedEvent = DataValidation.validateConsumed(newConsumedEvent)
            console.log("here")
            window.confirm("Add this event?")
            createConsumed(validatedConsumedEvent)
        } catch (e) {
            console.log(e)
            window.alert(e)
        }
        
    }

    // const handleCons = (e) => {
    //     e.preventDefault()
    //     console.log(e);
    //     console.log(`name: ${e.target.name}`)
    //     console.log(`value: ${e.target.value}`)
    //     const newCons = {...cons, [e.target.name]: e.target.value}
    //     console.log(newCons)
    //     setCons(newCons)
    // }
    
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

    // const handleUnits = (e) => {
        
    //     console.log(e);
    //     const newCons = {...cons, units: e.value}
    //     console.log(newCons)
    //     setCons(newCons)
    // }
    if (choice == 'consumable') {
        return (<></>)
        // return (
        //     <div id="CreationForm">
        //         <ConsumableForm onSubmit={(e) => {
        //             e.preventDefault(); 
        //             if(window.confirm("Create this Consumable?")) {
        //                 createConsumable(cons); 
        //                 setCons({...emptyCons})
        //             }}} 
        //             cons={cons} 
        //             onChange={handleCons} 
        //             selectOnChange={handleUnits}/>
        //     </div>
        // )
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