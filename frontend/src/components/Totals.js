import { useState } from "react"
import MacroCalcs from "../utilities/macroCalculations"


const Totals = ({isLoggedIn, consumed, setConsumed, removeConsumedEntry}) => {
    const [hiddenButton, setHiddenButton] = useState({display: 'block'})


    const totalCarbs = consumed.reduce((x,y) => {
        return {"carbs": x["carbs"] + y["carbs"]
    }}, {"carbs": 0})["carbs"]
    const totalFats = consumed.reduce((x,y) => {
        return {"fats": x["fats"] + y["fats"]
    }}, {"fats": 0})["fats"]
    const totalProteins = consumed.reduce((x,y) => {
        return {"proteins": x["proteins"] + y["proteins"]
    }}, {"proteins": 0})["proteins"]
    const totalKj = Math.round(MacroCalcs.calculateKilojoules(totalCarbs, totalFats, totalProteins)*10) / 10

    return (
    <div className = "Totals">
        <h2>Daily Totals</h2>
        <table className="Totals-table">
            <thead className="Totals-header">
                <tr>
                    <th>Source</th>
                    <th>Kilojoules</th>
                    <th>Carbohydrates</th>
                    <th>Fats</th>
                    <th>Proteins</th>
                </tr>
            </thead>
            <tbody>
                {consumed.map(val => 
                <tr className="Totals-row"
                    // onMouseEnter={e => {setHiddenButton({display: 'block'})}}
                    // onMouseLeave={e => {setTimeout(setHiddenButton, 300, {display: 'none'})}}
                    >
                    <td>source</td>
                    <td>{MacroCalcs.calculateKilojoules(val["carbs"],val["fats"],val["proteins"])}</td>
                    <td>{val["carbs"]}</td>
                    <td>{val["fats"]}</td>
                    <td>{val["proteins"]}</td>
                    <td style={hiddenButton}><button onClick={() => removeConsumedEntry(val.id)}>x</button></td>
                </tr>
                )}
            <tr>
                <td>Totals</td>
                <td>{totalKj}</td>
                <td>{totalCarbs}</td>
                <td>{totalFats}</td>
                <td>{totalProteins}</td>
            </tr>
            </tbody>
        </table>
    </div>  
    )
}


export default Totals;