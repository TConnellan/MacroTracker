
import ConsumableForm from "./ConsumableForm"
const NewConsumable = ({onSubmit, cons, onChange, selectOnChange}) => {    

    return (
        <ConsumableForm onSubmit={onSubmit} 
                        cons={cons}
                        onChange={onChange} 
                        selectOnChange={selectOnChange}/> 
    )
}


export default NewConsumable