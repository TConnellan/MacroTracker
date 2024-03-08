




const ConsumableSearchResult = ({result, chooseResult}) => {

    return  (
      <tr>
         <td>{result.cons_name}</td>
         <td>{result.brand_name}</td>
         <td>C:{result.carbs}</td> 
         <td>F:{result.fats}</td>
         <td>P:{result.proteins}</td>
         <td>{result.size}{result.units}</td>
         <td>
            <button onClick={event => {event.preventDefault(); chooseResult(result)}}>choose</button>
         </td>
      </tr>
        )
}



export default ConsumableSearchResult