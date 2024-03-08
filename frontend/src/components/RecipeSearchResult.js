

const RecipeSearchResult = ({result, chooseResult}) => {
    return (
        <tr>
            <td>{result.recipe_name}</td>
            <td><button onClick={(event) => chooseResult(event, result)}>choose</button></td>
        </tr>
    )
}


export default RecipeSearchResult;