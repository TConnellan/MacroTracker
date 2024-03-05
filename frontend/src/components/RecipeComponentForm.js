import { useState } from "react"
import SearchForm from "./SearchForm"
import NewConsumable from "./NewConsumable"
import consumedServices from "../services/consumed"
import EventTemplateGenerator from "../utilities/generateEvent"
import ConsumableSearchResult from "./ConsumableSearchResult"
import macroCalculations from "../utilities/macroCalculations"

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
        if (searchText.trim() == "") {
            return 
        }
        consumedServices.getConsumableSearchResults(searchText, token)
                        .then(data => {
                            console.log(data)
                            setSearchResults(data)
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
        // console.log("here1")
        event.preventDefault()
        // console.log("here2")
        consumedServices.postNewConsumable(newConsumable, token)
            .then(resp => {
                // get the id of the new consumable from the response
                // and record  it at the current recipe step
                // console.log(resp)
                const newId = resp.data.rows[0].id
                console.log(newId)
                const newComps = recipeComponents.map((comp) => {
                    if (comp.step_no == recipeStep) {
                        return {...comp, component_id: newId}
                    } else {
                        return {...comp}
                    }
                })
                console.log(newComps)
                // setRecipeComponents((comps) => {comps.map((comp) => {
                //     if (comp.step_no == recipeStep) {
                //         return {...comp, component_id: newId}
                //     } else {
                //         return {...comp}
                //     }
                // })})
            })
            .catch(err => {
                // error logic
                console.log(err)
            })
        // get the id of the 
    }

    const chooseResult = (result) => {
        console.log(result.id)
        updateComponent(recipeStep, result)
    }

    const configureComponent = (event) => {
        event.preventDefault()
        const _newConsumable = {...recipeComponents[recipeStep - 1], [event.target.name]: event.target.value}
        // console.log(_newConsumable)
        updateComponent(recipeStep, _newConsumable)
    }

    const computeActualGrams = (size, quantity) => {
        return Math.round(parseFloat(size)*parseFloat(quantity)*100)/100.0
    } 

    return (
        <>
        <div>Step: {recipeStep}</div>
        {recipeComponents[recipeStep - 1].cons_name != "" ?
        <>
            <div>
                Name: {recipeComponents[recipeStep - 1].cons_name}
            </div>
                Brand: {recipeComponents[recipeStep - 1].brand_name}
            <div>
                Size: {recipeComponents[recipeStep - 1].size}{recipeComponents[recipeStep - 1].units}
            </div>
                Quantity: <input name={"quantity"} defaultValue = {recipeComponents[recipeStep - 1].quantity} onChange={configureComponent}/>
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
                Description: <input name={"step_description"} defaultValue = {recipeComponents[recipeStep - 1].step_description} onChange={configureComponent}/>
            </div>
        </> : <></>}
            <div>
                <button onClick={event => toggleSearch(event)}>Search Existing</button>
            </div>
            <div>
                <button onClick={event => toggleCreate(event)}>Create new</button>
            </div>    
            <div>
            {searchExisting ? <><div><SearchForm value={searchText}
                                          onChange={handleSearch}
                                          onSubmit={getSearchResults}
                                          results={searchResults}
                                          /> 
                                </div>
                              <div>
                                {searchResults.map(result => <ConsumableSearchResult result={result} chooseResult={chooseResult}/>)}
                              </div>
                                          </>
                                          : <></>
                                          }
            {createNew ? <NewConsumable onSubmit={addNewConsumable} 
                                        cons={newConsumable}
                                        onChange={handleCreate} 
                                        selectOnChange={handleUnits}
                                        /> : <></>}
            </div>
        </>
    )
}


export default RecipeComponentForm