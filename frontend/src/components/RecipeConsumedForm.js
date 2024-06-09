import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Calcs from "../utilities/macroCalculations"


// Form for creating a custom consumed event, not saved as a consumable in the DB
const RecipeConsumedForm = ({handleChange, handleDate, consumed, submitCustomConsumed}) => {
    
    return (
        <form onSubmit={submitCustomConsumed} className='Consumable-form'>
            <h3>Creating from recipe:</h3>
            <div>Recipe: {consumed.recipe_name}</div>
            <div> 
                Carbs: {Calcs.computeActualGrams(consumed.carbs, consumed.quantity)}g
            </div>
            <div> 
                Fats: {Calcs.computeActualGrams(consumed.fats, consumed.quantity)}g
            </div>
            <div> 
                Proteins: {Calcs.computeActualGrams(consumed.proteins, consumed.quantity)}g
            </div>
            <div>
                <label for="quantity">Quantity:</label>
                <input id="quantity" name="quantity" defaultValue={consumed.quantity} onChange={handleChange}/>
            </div>
            <div>
                <label for="notes">Notes:</label>
                <input id="notes" name="notes" defaultValue={consumed.notes} onChange={handleChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
            <div>
            <label for = "date">Date:</label>
                <DatePicker id="date" selected={consumed.consumed_at}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            onChange={handleDate}
                            />
            </div>
        </form>
    )
}

export default RecipeConsumedForm