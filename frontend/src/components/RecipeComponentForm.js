import { useState } from "react"
import SearchForm from "./SearchForm"
import NewConsumable from "./NewConsumable"
import consumedServices from "../services/consumed"
import EventTemplateGenerator from "../utilities/generateEvent"
import ConsumableSearchResult from "./ConsumableSearchResult"
import macroCalculations from "../utilities/macroCalculations"
import { Table } from 'react-bootstrap'
const RecipeComponentForm = ({updateComponent, recipeStep, recipeComponents, setRecipeComponents}) => {
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
        if (searchText.trim() == "") {
            return 
        }
        consumedServices.getConsumableSearchResults(searchText)
                        .then(resp => {
                            setSearchResults(resp.data)
                        })
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
        setNewConsumable(_newConsumable)
    }

    const handleUnits = (event) => {
        const _newConsumable = {...newConsumable, units: event.value}
        setNewConsumable(_newConsumable)
    }

    const addNewConsumable = (event) => {
        event.preventDefault()
        consumedServices.postNewConsumable(newConsumable)
            .then(resp => {
                const newComp = {...newConsumable, component_id: resp.data.rows[0].id}
                updateComponent(recipeStep, newComp)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const chooseResult = (result) => {
        updateComponent(recipeStep, result)
    }

    const configureComponent = (event) => {
        event.preventDefault()
        const _newConsumable = {...recipeComponents[recipeStep - 1], [event.target.name]: event.target.value}
        updateComponent(recipeStep, _newConsumable)
    }

    const computeActualGrams = (size, quantity) => {
        return Math.round(parseFloat(size)*parseFloat(quantity)*100)/100.0
    } 

    return (
        <>
        <h4>Step: {recipeStep}</h4>
        {recipeComponents[recipeStep - 1].cons_name != "" || true ?
        <>
            <div>
                Name: {recipeComponents[recipeStep - 1].cons_name}
            </div>
                Brand: {recipeComponents[recipeStep - 1].brand_name}
            <div>
                Size: {recipeComponents[recipeStep - 1].size}{recipeComponents[recipeStep - 1].units}
            </div>
                Quantity: <input name={"quantity"} value = {recipeComponents[recipeStep - 1].quantity} onChange={configureComponent}/>
            <div>
                Carbs: {recipeComponents[recipeStep - 1].carbs} ({computeActualGrams(recipeComponents[recipeStep - 1].carbs, recipeComponents[recipeStep - 1].quantity)})
            </div>
            <div>
                Fats: {recipeComponents[recipeStep - 1].carbs} ({computeActualGrams(recipeComponents[recipeStep - 1].fats, recipeComponents[recipeStep - 1].quantity)})
            </div>
            <div>
                Proteins: {recipeComponents[recipeStep - 1].carbs} ({computeActualGrams(recipeComponents[recipeStep - 1].proteins, recipeComponents[recipeStep - 1].quantity)})   
            </div>
            <div>
                KiloJoules: {computeActualGrams(macroCalculations.calculateKilojoules(recipeComponents[recipeStep - 1].carbs, recipeComponents[recipeStep - 1].fats, recipeComponents[recipeStep - 1].proteins), 1)} ({computeActualGrams(macroCalculations.calculateKilojoules(recipeComponents[recipeStep - 1].carbs, recipeComponents[recipeStep - 1].fats, recipeComponents[recipeStep - 1].proteins), recipeComponents[recipeStep - 1].quantity)})   
            </div>
            <div>
                Description: <input name={"step_description"} value = {recipeComponents[recipeStep - 1].step_description} onChange={configureComponent}/>
            </div>
        </> : <></>}
            <div>
                <button onClick={event => toggleSearch(event)}>Search Existing</button>
                <button onClick={event => toggleCreate(event)}>Create new</button>
            </div>    
            <div>
            {searchExisting ?   <><div>
                                    <SearchForm value={searchText}
                                            onChange={handleSearch}
                                            onSubmit={getSearchResults}
                                            results={searchResults}
                                            />
                                </div>
                                <Table striped border hover variant={"secondary"}>
                                    <table>
                                        {searchResults.map(result => <ConsumableSearchResult result={result} chooseResult={chooseResult}/>)}
                                    </table>    
                                </Table>
                                </> : <></>}
            {createNew ? <div>
                            <NewConsumable onSubmit={addNewConsumable} 
                                        cons={newConsumable}
                                        onChange={handleCreate} 
                                        selectOnChange={handleUnits}
                                        /> 
                                        </div>: <></>}
            </div>
        </>
    )
}


export default RecipeComponentForm