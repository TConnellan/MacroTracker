import CreationForm from "./CreationForm"
import Select from "react-select"
import { useState } from "react"

const DailyMacros = ({user, createConsumable, createConsumed}) => {
    const options = [{label: "Create Recipe Component", value: "consumable"},
                     {label: "Create Recipe", value: "recipe"},
                     {label: "Add Custom Entry", value: "add custom"},
                     {label: "Add Entry from Recipe", value: "add recipe"}]
    // select form to pic what want to create
    const [choice, setChoice] = useState('add custom')

    const handleChoice = (e) => {
        // e.preventDefault()
        console.log("here")
        console.log(e.value)
        setChoice(e.value)
    }
    return (
        <div id="CreationForm">
            <Select onChange={handleChoice} defaultValue={choice} options = {options} className="creationForm-Choice"/>
            <CreationForm user={user} choice={choice} createConsumable={createConsumable} createConsumed={createConsumed}/>
        </div>
    )
}

export default DailyMacros;