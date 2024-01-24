import Totals from "./Totals"
import DailyMacros from "./DailyMacros"

const Display = ({isLoggedIn, user, consumed, consumedDate, setConsumed, removeConsumedEntry, createConsumable, createConsumed}) => {



    if (isLoggedIn) {
        return (
            <div id="Display">
            
            <div>
                <h3>{consumedDate}</h3>
                <Totals isLoggedIn={isLoggedIn} consumed={consumed} setConsumed={setConsumed} removeConsumedEntry={removeConsumedEntry}/>
            </div>
            
            <div className="Consumable-form">
                <DailyMacros user = {user} createConsumable ={createConsumable} createConsumed={createConsumed}/>
                
            </div>
            </div>
            )
    } else {
        return <></>
    }
}


export default Display;