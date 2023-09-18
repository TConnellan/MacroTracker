import Totals from "./Totals"
import DailyMacros from "./DailyMacros"

const Display = ({isLoggedIn, user, consumed, consumedDate, setConsumed, createConsumable, createConsumed}) => {



    if (isLoggedIn) {
        return (
            <div id="Display">
            
            <div>
                <h3>{consumedDate}</h3>
                <Totals isLoggedIn={isLoggedIn} consumed={consumed}/>
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