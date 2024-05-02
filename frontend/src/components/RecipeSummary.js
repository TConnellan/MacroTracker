import macroCalculations from "../utilities/macroCalculations"
import { Table } from 'react-bootstrap'

const RecipeSummary = ({recipeComponents}) => {

    const computeActualGrams = (size, quantity) => {
        return Math.round(parseFloat(size)*parseFloat(quantity)*100)/100.0
    }

    return (
        <Table striped border hover variant={"secondary"}>
            <table > {/* className="Totals-table"*/}
                <thead > {/*className="Totals-header"*/}
                    <tr>
                        <th>Step #</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Amount</th>
                        <th>Carbs</th>
                        <th>Fats</th>
                        <th>Proteins</th>
                        <th>Kj</th>
                    </tr>
                </thead>
                <tbody>
                {
                    recipeComponents.map(comp => {
                        return (
                            <tr>
                                <td>{comp.step_no}</td>
                                <td>{comp.cons_name}</td>
                                <td>{comp.brand_name}</td>
                                <td>{computeActualGrams(comp.quantity, comp.size)}{comp.units}</td>
                                <td>{computeActualGrams(comp.quantity, comp.carbs)}</td>
                                <td>{computeActualGrams(comp.quantity, comp.fats)}</td>
                                <td>{computeActualGrams(comp.quantity, comp.proteins)}</td>
                                <td>{macroCalculations.calculateKilojoules(comp.carbs, comp.fats, comp.proteins)}</td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <td>Totals</td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td> {/* the following is pointless repetition, can store cumulative macros so not repeating the reduce in kjs, will implement state for it later*/}
                    <td>{Math.round(recipeComponents.reduce((acc,curr) => acc + computeActualGrams(curr.quantity, curr.carbs), 0)*10)/10}</td>
                    <td>{Math.round(recipeComponents.reduce((acc,curr) => acc + computeActualGrams(curr.quantity, curr.fats), 0)*10)/10}</td>
                    <td>{Math.round(recipeComponents.reduce((acc,curr) => acc + computeActualGrams(curr.quantity, curr.proteins), 0)*10)/10}</td>
                    <td>{Math.round(macroCalculations.calculateKilojoules(
                                            recipeComponents.reduce((acc,curr) => (acc + curr.carbs * curr.quantity), 0), 
                                            recipeComponents.reduce((acc,curr) => (acc + curr.fats * curr.quantity), 0), 
                                            recipeComponents.reduce((acc,curr) => (acc + curr.proteins * curr.quantity), 0))*10)/10}
                                            </td>
                                            
                </tr>
                </tbody>

            </table>    
        </Table> 
        
    )
}

export default RecipeSummary