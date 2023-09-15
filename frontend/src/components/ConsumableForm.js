import Select from 'react-select'

const ConsumableForm = ({onSubmit, cons, onChange}) => {
    const options = [{value: 'ml', label: 'milliliters'},
                     {value: 'g', label: 'grams'}
                    ]
    return (
        <form onSubmit={onSubmit} className='Consumable-form'>
            <div>
                Name: <input defaultValue = {cons.name} onchange={onChange}/>
            </div>
            <div>
                Brand Name: <input defaultValue = {cons.brand} onchange={onChange}/>
            </div>
            <div>
                Size: <input defaultValue = {cons.size} onchange={onChange}/>
            </div>

            <div>
                Carbs (g): <input defaultValue = {cons.carbs} onchange={onChange}/>
            </div>
            <div>
                Fats (g): <input defaultValue= {cons.fats} onchange={onChange}/>
            </div>
            <div>
                Proteins (g): <input defaultValue = {cons.proteins} onchange={onChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
/*
            <div>
                Units: <Select name={"units"} onchange={() => {console.log("units")}} options={options}/>
            </div>
*/


export default ConsumableForm;