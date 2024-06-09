import SearchForm from "./SearchForm";
import RecipeSearchResult from "./RecipeSearchResult";
import consumedServices from "../services/consumed"
import { useEffect, useState } from "react";
import RecipeConsumedForm from "./RecipeConsumedForm";
import { Table } from 'react-bootstrap'

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
                        .then(resp => {
                            console.log(resp)
                            setSearchResults(resp.data)
                        })
    } 

    const chooseResult = (event, result) => {
        event.preventDefault()
        console.log("A")
        console.log(result)
        
        const newValues = {recipe_id: result.id, 
                           recipe_name: result.recipe_name,
                           notes: result.notes,
                           carbs: result.components.reduce((acc, curr) => acc + curr.carbs * curr.quantity, 0),
                           fats: result.components.reduce((acc, curr) => acc + curr.fats * curr.quantity, 0),
                           proteins: result.components.reduce((acc, curr) => acc + curr.proteins * curr.quantity, 0)
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
            <Table striped border hover variant={"secondary"}>
                <table>
                    {searchResults.map(result => <RecipeSearchResult result={result} chooseResult={chooseResult}/>)}
                </table>
            </Table>
        </>
    )
}



export default SearchRecipes;