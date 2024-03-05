




const ConsumableSearchResult = ({result, chooseResult}) => {

    return  (
         <div>
            {result.cons_name} | {result.brand_name} | C/F/P: {result.carbs}/{result.fats}/{result.proteins} | {result.size}{result.units} | <button onClick={event => {event.preventDefault(); chooseResult(result)}}>choose</button>
         </div>
        )
}



export default ConsumableSearchResult