import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


// Form for creating a custom consumed event, not saved as a consumable in the DB
const RecipeConsumedForm = ({handleChange, handleDate, consumed, submitCustomConsumed}) => {
    // const emptyConsumedEvent = {recipe:'', quantity: '', carbs: 0, proteins: 0, consumedAt: ''}
    const computeActualGrams = (size, quantity) => {
        return Math.round(parseFloat(size)*parseFloat(quantity)*100)/100.0
    } 
    
    return (
        <form onSubmit={submitCustomConsumed} className='Consumable-form'>
            <h3>Creating from recipe: {consumed.recipe_name}</h3>
            <div> 
                Carbs: {computeActualGrams(consumed.carbs, consumed.quantity)}g
            </div>
            <div> 
                Fats: {computeActualGrams(consumed.fats, consumed.quantity)}g
            </div>
            <div> 
                Proteins: {computeActualGrams(consumed.proteins, consumed.quantity)}g
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