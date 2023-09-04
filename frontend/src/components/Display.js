
import Totals from "./Totals"


const Display = ({isLoggedIn, user, consumed, consumedDate, setConsumed}) => {
    if (isLoggedIn) {
        return (
            <>
            <h3>{consumedDate}</h3>
            <Totals isLoggedIn={isLoggedIn} consumed={consumed}/>
            </>
            )
    } else {
        return <></>
    }
}


export default Display;