import RecipeForm from "./RecipeForm"


const RecipeDisplay = ({user, token}) => {
    return (
        <>
            <RecipeForm token={token} user={user}/>
        </>
    )
}

export default RecipeDisplay