import { createSlice } from '@reduxjs/toolkit'


const initialState =  {
    username: ""
}


// returns object containing the reducer as well as the action creators defined by the reducers parameters
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action) {
        return {...state, username: action.payload}
      }
    }
  })

export const { setUser } = userSlice.actions
export default userSlice.reducer