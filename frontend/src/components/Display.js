import Totals from "./Totals"
import DailyMacros from "./DailyMacros"
import { useEffect, useState } from "react"
import consumedEventGenerator from "../utilities/generateEvent"
import DateRange from './DateRange'

const Display = ({isLoggedIn, user, consumed, consumedDate, setConsumed, removeConsumedEntry, createConsumable, createConsumed}) => {
    const [newConsumedEvent, setNewConsumedEvent] = useState(consumedEventGenerator.getEmptyConsumedEvent(user, new Date()))
    const [selectedStartDate, setSelectedStartDate] = useState('')
    const [selectedEndDate, setSelectedEndDate] = useState(null)

    useEffect(() => {
        const today = new Date()
        today.setHours(0, 0, 0)
        setSelectedStartDate(today)
    }, [])

    const createDateHeaderValue = (startDate, endDate) => {
        return startDate.toString()
    }



    if (isLoggedIn) {
        return (
            <div id="Display">

                <div> 
                    <DateRange startDate={selectedStartDate}
                               endDate={selectedEndDate} 
                               setStartDate={setSelectedStartDate}
                               setEndDate={setSelectedEndDate}
                               timeInterval={5}/>
                    <h3>{createDateHeaderValue(selectedStartDate, selectedEndDate)}</h3>
                    <Totals isLoggedIn={isLoggedIn} 
                            consumed={consumed} 
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
    } else {
        return <></>
    }
}


export default Display;