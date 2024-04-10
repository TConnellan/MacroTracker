import { createSlice } from '@reduxjs/toolkit'


const initialState =  {
    recipes: []
}


// returns object containing the reducer as well as the action creators defined by the reducers parameters
const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
      setRecipes(state, action) {
        state.recipes = action.payload // ok because immer
      },
      addRecipe(state, action) {
        state.recipes.push(action.payload)
      }
    }
  })

export const { setRecipes, addRecipe } = recipeSlice.actions
export default recipeSlice.reducer