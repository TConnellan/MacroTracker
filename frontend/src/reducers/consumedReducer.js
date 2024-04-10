import { createSlice } from '@reduxjs/toolkit'


const initialState =  {
    consumedDate: Date(),
    consumed: []
}


// returns object containing the reducer as well as the action creators defined by the reducers parameters
const consumedSlice = createSlice({
    name: 'consumed',
    initialState,
    reducers: {
      setConsumedDate(state, action) {
        state.consumedDate = action.payload // ok because immer
      },
      setConsumed(state, action) {
        console.log("setting consumed:")
        console.log(action.payload)
        state.consumed = action.payload // ok because immer
      },
      addToConsumed(state, action) {
        state.consumed.push(action.payload)
      },
      emptyConsumed(state, action) { 
        state.consumed = [] // ok because immer
      },
      removeFromConsumed(state, action) {
        return state.consumed.filter(cons => cons.id != action.payload)
      }
    }
  })

export const { setConsumedDate, setConsumed, emptyConsumed, removeFromConsumed } = consumedSlice.actions
export default consumedSlice.reducer