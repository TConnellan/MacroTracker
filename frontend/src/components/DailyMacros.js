import CreationForm from "./CreationForm"
import Select from "react-select"
import { useState } from "react"

const DailyMacros = ({createConsumable, createConsumed, newConsumedEvent, setNewConsumedEvent}) => {
    
    const options = [{label: "Add Custom Entry", value: "add custom"},
                     {label: "Add Entry from Recipe", value: "add recipe"}]
    const [choice, setChoice] = useState('add custom')

    const handleChoice = (e) => {
        setChoice(e.value)
    }
    return (
        <div id="CreationForm">
            <Select onChange={handleChoice} 
                    defaultValue={choice} 
                    options = {options} 
                    className="creationForm-Choice"/>
            <CreationForm choice={choice} 
                          createConsumable={createConsumable} 
                          createConsumed={createConsumed} 
                          newConsumedEvent={newConsumedEvent} 
                          setNewConsumedEvent={setNewConsumedEvent}/>
        </div>
    )
}

export default DailyMacros;