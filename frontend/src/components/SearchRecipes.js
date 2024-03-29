import SearchForm from "./SearchForm";
import RecipeSearchResult from "./RecipeSearchResult";
import consumedServices from "../services/consumed"
import { useEffect, useState } from "react";
import RecipeConsumedForm from "./RecipeConsumedForm";


const SearchRecipes = ({submitConsumedFromRecipe, consumed, submitCustomConsumed, handleChange, handleDate, loadConsumedFromRecipe}) => {
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [selectedRecipe, setSelectedRecipe] = useState(false)

    const updateSearch = (event) => {
        event.preventDefault()
        setSearchText(event.target.value)
    }

    const submitSearch = (event) => {
        event.preventDefault()
        if (searchText.trim() == "") {
            return 
        }
        consumedServices.getRecipeSearchResults(searchText)
                        .then(data => {
                            console.log(data)
                            setSearchResults(data)
                        })
    } 

    const chooseResult = (event, result) => {
        event.preventDefault()
        console.log("A")
        console.log(result)
        
        const newValues = {recipe_id: result.id, 
                           recipe_name: result.recipe_name,
                           notes: result.notes,
                           carbs: result.components.reduce((acc, curr) => acc + curr.carbs, 0),
                           fats: result.components.reduce((acc, curr) => acc + curr.fats, 0),
                           proteins: result.components.reduce((acc, curr) => acc + curr.proteins, 0)
                          }
        console.log(newValues)
        loadConsumedFromRecipe(newValues)
        setSelectedRecipe(true)
        
        // update with the values from the chosen 
    }

    return (
        <>
            {selectedRecipe ? 
            <>
                <RecipeConsumedForm handleChange={handleChange} 
                                    handleDate={handleDate} 
                                    consumed={consumed} 
                                    submitCustomConsumed={submitConsumedFromRecipe} />
            </>
            :
            <>
            </>
        }
            <div>
                <SearchForm value={searchText} onChange={updateSearch} onSubmit={submitSearch}/>
            </div>
            <table>
                {searchResults.map(result => <RecipeSearchResult result={result} chooseResult={chooseResult}/>)}
            </table>
        </>
    )
}



export default SearchRecipes;