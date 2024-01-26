import Totals from "./Totals"
import DailyMacros from "./DailyMacros"
import { useState } from "react"
import consumedEventGenerator from "../utilities/generateEvent"

const Display = ({isLoggedIn, user, consumed, consumedDate, setConsumed, removeConsumedEntry, createConsumable, createConsumed}) => {
    const [newConsumedEvent, setNewConsumedEvent] = useState(consumedEventGenerator.getEmptyConsumedEvent(user, new Date()))


    if (isLoggedIn) {
        return (
            <div id="Display">   
                <div>
                    <h3>{consumedDate}</h3>
                    <Totals isLoggedIn={isLoggedIn} 
                            consumed={consumed} 
                            setConsumed={setConsumed} 
                            removeConsumedEntry={removeConsumedEntry}/>
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