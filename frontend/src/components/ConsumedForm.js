import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const ConsumedForm = ({handleChange, consumed, submitCustomConsumed}) => {
    // const emptyConsumedEvent = {recipe:'', quantity: '', carbs: 0, proteins: 0, consumedAt: ''}
    return (
        <form onSubmit={submitCustomConsumed} className='Consumable-form'>
            <h3>Add a Custom Event</h3>
            <div>
            <label for="carbs">Carbs:</label>
                <input id="carbs" name="carbs" defaultValue={consumed.carbs} onChange={handleChange} />
            </div>
            <div>
            <label id="fats">Fats:</label>
                <input id="fats" name="fats" defaultValue={consumed.fats} onChange={handleChange} />
            </div>
            <div>
            <label for="proteins">Proteins:</label>
                <input id="proteins" name="proteins" defaultValue={consumed.proteins} onChange={handleChange} />
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
                <DatePicker id="date" selected={consumed.consumed_at}       showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"/>
            </div>
        </form>
    )
}

export default ConsumedForm