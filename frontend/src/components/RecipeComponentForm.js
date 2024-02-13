import { useState } from "react"
import SearchForm from "./SearchForm"
import NewConsumable from "./NewConsumable"
import consumedServices from "../services/consumed"


const RecipeComponentForm = ({updateComponent, recipeStep, recipeComponents, setRecipeComponents, token}) => {
    const [searchExisting, setSearchExisting] = useState(false)
    const [createNew, setCreateNew] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = (event) => {
        event.preventDefault()
        setSearchText(event.target.value)
    }

    const getSearchResults = (event) => {
        event.preventDefault()
        const results = consumedServices.getConsumableSearchResults(searchText, token)
        setSearchResults(results)

    } 

    const toggleSearch = (event) => {
        event.preventDefault()
        setSearchExisting(true)
        setCreateNew(false)
    }

    const toggleCreate = (event) => {
        event.preventDefault()
        setSearchExisting(false)
        setCreateNew(true)
    }

    return (
        <>
            <div>Step: {recipeStep}</div>
            <button onClick={event => toggleSearch(event)}>Search Existing</button>
            <button onClick={event => toggleCreate(event)}>Create new</button>
            {searchExisting ? <SearchForm value={searchText}
                                          onChange={handleSearch}
                                          onSubmit={getSearchResults}
                                          results={searchResults}
                                          /> : <></>}
            {createNew ? <NewConsumable /> : <></>}
        </>
    )
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