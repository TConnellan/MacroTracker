import { useEffect, useState } from "react"
import MacroCalcs from "../utilities/macroCalculations"
import consumedServices from "../services/consumed"

import { useSelector, useDispatch } from "react-redux"
import { removeFromConsumed } from "../reducers/consumedReducer"


const Totals = ({startDate, endDate}) => {
    const [hiddenButton, setHiddenButton] = useState({display: 'block'})
    const [filteredConsumed, setFilteredConsumed] = useState([])
    const [totals, setTotals] = useState({totalKJ:0,totalCarbs:0,totalFats:0,totalProteins:0})

    const consumed = useSelector(state => state.consumed.consumed)
    const dispatch = useDispatch()

    useEffect(() => {
        setFilteredConsumed(consumed.filter((val) => {
            const startCond = val.consumed_at >= startDate.toISOString().slice(0, 19)
            var endCond = true
            if (endDate) {
                endCond = val.consumed_at <= endDate.toISOString().slice(0, 19)
            }
            return startCond && endCond
        }))
        
    }, [startDate, endDate, consumed])

    useEffect(() => {
        const totalCarbs = Math.round(filteredConsumed.reduce((x,y) => {
            return {"carbs": x["carbs"] + y["carbs"]*y["quantity"]
        }}, {"carbs": 0})["carbs"]*10)/10
        const totalFats = Math.round(filteredConsumed.reduce((x,y) => {
            return {"fats": x["fats"] + y["fats"]*y["quantity"]
        }}, {"fats": 0})["fats"]*10)/10
        const totalProteins = Math.round(filteredConsumed.reduce((x,y) => {
            return {"proteins": x["proteins"] + y["proteins"]*y["quantity"]
        }}, {"proteins": 0})["proteins"]*10)/10
        const totalKj = Math.round(MacroCalcs.calculateKilojoules(totalCarbs, totalFats, totalProteins)*10)/10
        setTotals({totalKj:totalKj, totalCarbs:totalCarbs, totalFats:totalFats, totalProteins:totalProteins})
    }, [filteredConsumed])


    const removeConsumedEntry = (id) => {
        consumedServices.deleteConsumedEvent(id)
            .then(() => {
              dispatch(removeFromConsumed(id))
            })
    }

    return (
    <div className = "Totals">
        <h2>Totals</h2>
        <table className="Totals-table">
            <thead className="Totals-header">
                <tr>
                    <th>Date</th>
                    <th>Source</th>
                    <th>Kilojoules</th>
                    <th>Carbohydrates</th>
                    <th>Fats</th>
                    <th>Proteins</th>
                </tr>
            </thead>
            <tbody>
                {filteredConsumed.map(val => 
                <tr className="Totals-row"
                    // onMouseEnter={e => {setHiddenButton({display: 'block'})}}
                    // onMouseLeave={e => {setTimeout(setHiddenButton, 300, {display: 'none'})}}
                    >
                    <td>{MacroCalcs.formatDate(val.consumed_at)}</td>
                    <td> - </td>
                    <td>{Math.round(MacroCalcs.calculateKilojoules(val["carbs"],val["fats"],val["proteins"])*val["quantity"]*10)/10}</td>
                    <td>{val["carbs"]*val["quantity"]}</td>
                    <td>{val["fats"]*val["quantity"]}</td>
                    <td>{val["proteins"]*val["quantity"]}</td>
                    <td style={hiddenButton}><button onClick={() => removeConsumedEntry(val.id)}>x</button></td>
                </tr>
                )}
            <tr>
                <td>Totals</td>
                <td> - </td>
                <td>{totals.totalKj}</td>
                <td>{totals.totalCarbs}</td>
                <td>{totals.totalFats}</td>
                <td>{totals.totalProteins}</td>
            </tr>
            </tbody>
        </table>
    </div>  
    )
}


export default Totals;