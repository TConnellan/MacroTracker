
import ConsumableForm from "./ConsumableForm";
import Totals from "./Totals"
import { useState } from "react";

const Display = ({isLoggedIn, user, consumed, consumedDate, setConsumed, cons, setCons}) => {
    

    const handleCons = (e) => {
        e.preventDefault()
        console.log(e);
        const newCons = {...cons, [e.target.name]: e.target.value}
        console.log(newCons)
        setCons(newCons)
    }

    if (isLoggedIn) {
        return (
            <>
            <h3>{consumedDate}</h3>
            <Totals isLoggedIn={isLoggedIn} consumed={consumed}/>
            <div className="Consumable-form">
                <ConsumableForm onSubmit={(e) => {e.preventDefault(); console.log("entered a consumable")}} cons={cons} onChange={handleCons}/>
            </div>
            </>
            )
    } else {
        return <></>
    }
}


export default Display;