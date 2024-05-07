import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { useDispatch } from 'react-redux';
import { setConsumedStartDate, setConsumedEndDate } from '../reducers/consumedReducer';

const DateRange = ({startDate, setStartDate, endDate, setEndDate, timeInterval}) => {
    if (!timeInterval) {
        timeInterval = 15
    }

    const dispatch = useDispatch()

    return (
        <form onSubmit={() => {}}>
            <div>
                <label htmlFor = "startdate">Start Date:</label>
                    <DatePicker id="startdate" selected={startDate}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={timeInterval}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                onChange={(date) => {console.log(`setting date to ${date}`); dispatch(setConsumedStartDate(date))}}
                                />
            </div>
            <div>
                <label htmlFor = "enddate">End Date:</label>
                    <DatePicker id="enddate" selected={endDate}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={timeInterval}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                onChange={(date) => dispatch(setConsumedEndDate(date))}
                                />
            </div>
        </form>
    )
}

export default DateRange;