


const SearchForm = ({value, onChange, onSubmit}) => (
    <div className="Search">
        <h2>Search for a food item:</h2>
        <form>
            <input value={value} onChange = {onChange}/>
            <button onClick={onSubmit}>Search</button>
        </form>
    </div>
)

export default SearchForm;