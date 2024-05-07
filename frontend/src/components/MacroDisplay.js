import Totals from "./Totals"
import DailyMacros from "./DailyMacros"
import { useEffect, useState } from "react"
import EventTemplateGenerator from "../utilities/generateEvent"
import DateRange from './DateRange'

import { useSelector } from "react-redux"

const MacroDisplay = ({removeConsumedEntry, createConsumable, createConsumed}) => {

    const user = useSelector(state => state.user.username)

    const [newConsumedEvent, setNewConsumedEvent] = useState(EventTemplateGenerator.getEmptyConsumedEvent(user, new Date()))
    // const [selectedStartDate, setSelectedStartDate] = useState(new Date())
    // const [selectedEndDate, setSelectedEndDate] = useState(null)

    const selectedStartDate = useSelector(state => state.consumed.consumedStartDate)
    const selectedEndDate = useSelector(state => state.consumed.consumedEndDate)

    // useEffect(() => {
    //     const today = new Date()
    //     today.setHours(0, 0, 0)
    //     setSelectedStartDate(today)
    // }, [])

    const createDateHeaderValue = (startDate, endDate) => {
        return startDate.toString().slice(0, 24) + `${endDate ? " - " + endDate.toString().slice(0,24) : ""}`
    }

    return (
        <div id="Macro-Display">

            <div id="Macro-Dates"> 
                <DateRange startDate={selectedStartDate}
                            endDate={selectedEndDate} 
                            timeInterval={5}/>
                <h3>{createDateHeaderValue(selectedStartDate, selectedEndDate)}</h3>
                <Totals removeConsumedEntry={removeConsumedEntry}
                        startDate={selectedStartDate}
                        endDate={selectedEndDate}/>
            </div>
                <DailyMacros className="Consumable-Form" 
                                createConsumable ={createConsumable} 
                                createConsumed={createConsumed} 
                                newConsumedEvent={newConsumedEvent} 
                                setNewConsumedEvent={setNewConsumedEvent}/>
        </div>
        )
}


export default MacroDisplay;