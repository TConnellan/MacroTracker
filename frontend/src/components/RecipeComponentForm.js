import { useState } from "react"
import SearchForm from "./SearchForm"
import NewConsumable from "./NewConsumable"


const RecipeComponentForm = ({updateComponent, recipeStep, recipeComponents, setRecipeComponents}) => {
    const [searchExisting, setSearchExisting] = useState(false)

    if (searchExisting) {
        // let them add search for an existing consumable to add
        return (
            <>
                <SearchForm/>
            </>
        )
    } else {
        // let them create a new one
        // make this a pop up, can use it in macros page to
        return (
            <>
                <NewConsumable/>
            </>
        )
    }
}


export default RecipeComponentForm