import { useState } from "react"
import SearchForm from "./SearchForm"
import NewConsumable from "./NewConsumable"
import consumedServices from "../services/consumed"
import EventTemplateGenerator from "../utilities/generateEvent"


const RecipeComponentForm = ({updateComponent, recipeStep, recipeComponents, setRecipeComponents, token}) => {
    const [searchExisting, setSearchExisting] = useState(false)
    const [createNew, setCreateNew] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [newConsumable, setNewConsumable] = useState(EventTemplateGenerator.getEmptyConsumable())

    const toggleSearch = (event) => {
        event.preventDefault()
        setSearchExisting(true)
        setCreateNew(false)
    }

    const handleSearch = (event) => {
        event.preventDefault()
        setSearchText(event.target.value)
    }

    const getSearchResults = (event) => {
        event.preventDefault()
        const results = consumedServices.getConsumableSearchResults(searchText, token)
        setSearchResults(results)

    } 

    const saveExistingRecipe = (id) => {
        // update the list we are storing
    }

    const toggleCreate = (event) => {
        event.preventDefault()
        setSearchExisting(false)
        setCreateNew(true)
    }

    const handleCreate = (event) => {
        event.preventDefault()
        const _newConsumable = {...newConsumable, [event.target.name] : event.target.value}
        console.log(_newConsumable)
        setNewConsumable(_newConsumable)
    }

    const handleUnits = (event) => {
        console.log(event);
        const _newConsumable = {...newConsumable, units: event.value}
        console.log(_newConsumable)
        setNewConsumable(_newConsumable)
    }

    const addNewConsumable = (event) => {
        console.log("here1")
        event.preventDefault()
        console.log("here2")
        consumedServices.postNewConsumable(newConsumable, token)
            .then(resp => {
                // get the id of the new consumable from the response
                // and record  it at the current recipe step
                console.log(resp)
            })
            .catch(err => {
                // error logic
                console.log(err)
            })
        // get the id of the 
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
            {createNew ? <NewConsumable onSubmit={addNewConsumable} 
                                        cons={newConsumable}
                                        onChange={handleCreate} 
                                        selectOnChange={handleUnits}
                                        /> : <></>}
        </>
    )
}


export default RecipeComponentForm