import Select from 'react-select'

const ConsumableForm = ({onSubmit, cons, onChange, selectOnChange}) => {
    const options = [{value: 'ml', label: 'milliliters'},
                     {value: 'g', label: 'grams'}
                    ]
    return (
        <form onSubmit={onSubmit} className='Consumable-form'>
            <h3>Add a Base Component:</h3>
            <div>
                Name: <input name={"name"} defaultValue = {cons.name} onChange={onChange}/>
            </div>
            <div>
                Brand Name: <input name="brand" defaultValue = {cons.brand} onChange={onChange}/>
            </div>
            <div>
                Size: <input name="size" defaultValue = {cons.size} onChange={onChange}/>
            </div>
            <div>
                Units: <Select name={"units"} onChange={selectOnChange} options={options}/>
            </div>
            <div>
                Carbs (g): <input name="carbs" defaultValue = {cons.carbs} onChange={onChange}/>
            </div>
            <div>
                Fats (g): <input name="fats" defaultValue= {cons.fats} onChange={onChange}/>
            </div>
            <div>
                Proteins (g): <input name="proteins" defaultValue = {cons.proteins} onChange={onChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
/*

*/


export default ConsumableForm;