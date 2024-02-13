import Totals from "./Totals"
import DailyMacros from "./DailyMacros"
import { useEffect, useState } from "react"
import EventTemplateGenerator from "../utilities/generateEvent"
import DateRange from './DateRange'

const MacroDisplay = ({user, consumed, consumedDate, setConsumed, removeConsumedEntry, createConsumable, createConsumed}) => {
    const [newConsumedEvent, setNewConsumedEvent] = useState(EventTemplateGenerator.getEmptyConsumedEvent(user, new Date()))
    const [selectedStartDate, setSelectedStartDate] = useState(new Date())
    const [selectedEndDate, setSelectedEndDate] = useState(null)

    useEffect(() => {
        const today = new Date()
        today.setHours(0, 0, 0)
        setSelectedStartDate(today)
    }, [])

    const createDateHeaderValue = (startDate, endDate) => {
        return startDate.toString().slice(0, 24) + `${endDate ? " - " + endDate.toString().slice(0,24) : ""}`
    }

    return (
        <div id="Display">

            <div> 
                <DateRange startDate={selectedStartDate}
                            endDate={selectedEndDate} 
                            setStartDate={setSelectedStartDate}
                            setEndDate={setSelectedEndDate}
                            timeInterval={5}/>
                <h3>{createDateHeaderValue(selectedStartDate, selectedEndDate)}</h3>
                <Totals consumed={consumed} 
                        setConsumed={setConsumed} 
                        removeConsumedEntry={removeConsumedEntry}
                        startDate={selectedStartDate}
                        endDate={selectedEndDate}/>
            </div>
            <div className="Consumable-form">
                <DailyMacros user = {user} 
                                createConsumable ={createConsumable} 
                                createConsumed={createConsumed} 
                                newConsumedEvent={newConsumedEvent} 
                                setNewConsumedEvent={setNewConsumedEvent}/>
            </div>
        </div>
        )
}


export default MacroDisplay;