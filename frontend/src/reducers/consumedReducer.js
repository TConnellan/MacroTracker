import { createSlice } from '@reduxjs/toolkit'


const initialState =  {
    consumedStartDate: new Date(),
    consumedEndDate: new Date(),
    consumed: []
}


// returns object containing the reducer as well as the action creators defined by the reducers parameters
const consumedSlice = createSlice({
    name: 'consumed',
    initialState,
    reducers: {
      setConsumedStartDate(state, action) {
        state.consumedStartDate = action.payload // ok because immer
      },
      setConsumedEndDate(state, action) {
        state.consumedEndDate = action.payload // ok because immer
      },
      setConsumed(state, action) {
        console.log("setting consumed:")
        console.log(action.payload)
        state.consumed = action.payload // ok because immer
      },
      addToConsumed(state, action) {
        // TODO possibly make sure id's are unique, see below
        state.consumed.push(action.payload)
      },
      addAllToConsumed(state, action) {
        // TODO possibly make sure id's are unique, currently we only ever request more records in the range of [new_start_date, old_start_date)
        //      but if somehow consumedStartDate was set to a later date then these intervals could start overlapping, food for thought
        state.consumed.push(...action.payload)
      },
      emptyConsumed(state, action) { 
        state.consumed = [] // ok because immer
      },
      removeFromConsumed(state, action) {
         state.consumed = state.consumed.filter(cons => cons.id != action.payload)
      }
    }
  })

export const { setConsumedStartDate, setConsumedEndDate, setConsumed, emptyConsumed, removeFromConsumed, addToConsumed, addAllToConsumed } = consumedSlice.actions
export default consumedSlice.reducer