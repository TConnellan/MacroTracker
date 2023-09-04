
import Results from './Results'

const SearchForm = ({value, onChange, onSubmit, results}) => (
    <div className="Search">
        <h2>Search for a food item:</h2>
        <form>
            <input value={value} onChange = {onChange}/>
            <button onClick={onSubmit}>Search</button>
        </form>
        <Results results = {[]} />
    </div>
)

export default SearchForm;