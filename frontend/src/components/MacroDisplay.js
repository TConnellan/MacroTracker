import Totals from "./Totals"
import DailyMacros from "./DailyMacros"
import { useEffect, useState } from "react"
import EventTemplateGenerator from "../utilities/generateEvent"
import DateRange from './DateRange'
import consumedServices from '../services/consumed'
import {addAllToConsumed, setConsumedStartDate} from '../reducers/consumedReducer'

import { useSelector, useDispatch } from "react-redux"

const MacroDisplay = ({createConsumable, createConsumed}) => {

    const user = useSelector(state => state.user.username)
    const stateStartDate = useSelector(state => state.consumed.consumedStartDate)
    const stateEndDate = useSelector(state => state.consumed.consumedEndDate)

    const [newConsumedEvent, setNewConsumedEvent] = useState(EventTemplateGenerator.getEmptyConsumedEvent(user, new Date()))
    const [selectedStartDate, setSelectedStartDate] = useState(stateStartDate)
    const [selectedEndDate, setSelectedEndDate] = useState(stateEndDate)

    const dispatch = useDispatch()

    const updateSelectedStartDate = (newDate) => {
        if (newDate < stateStartDate) {
            // need to update the state
            consumedServices.getAllConsumedByDate(newDate, stateStartDate)
                .then(data => {
                    
                    dispatch(addAllToConsumed(data))
                    dispatch(setConsumedStartDate(newDate))
                })
                .then(() => {
                    setSelectedStartDate(newDate)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const createDateHeaderValue = (startDate, endDate) => {
        return startDate.toString().slice(0, 24) + `${endDate ? " - " + endDate.toString().slice(0,24) : ""}`
    }

    return (
        <div id="Macro-Display">

            <div id="Macro-Dates"> 
                <DateRange startDate={selectedStartDate}
                            setStartDate={updateSelectedStartDate}
                            endDate={selectedEndDate}
                            setEndDate={setSelectedEndDate} 
                            timeInterval={5}/>
                <h3>{createDateHeaderValue(selectedStartDate, selectedEndDate)}</h3>
                <Totals startDate={selectedStartDate}
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