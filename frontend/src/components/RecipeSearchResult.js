

const RecipeSearchResult = ({result, chooseResult}) => {
    return (
        <div>
            {result.recipe_name} | <button onClick={(event) => chooseResult(event, result)}>choose</button>
        </div>
    )
}


export default RecipeSearchResult;